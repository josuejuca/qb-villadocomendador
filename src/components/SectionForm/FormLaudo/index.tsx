// FormLaudo/index.tsx
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const host = import.meta.env.VITE_API_HOST;
// Novo: host do gateway
const gatewayHost = import.meta.env.VITE_API_HOST;

type Mode = "estimativa" | "precisa";

interface FormData {
  tipoImovel: string;
  cidade: string;
  bairro: string;
  endereco: string;
  padraoImovel: string;
  metragem: string;
  quartos: number;
  suites: number;
  vagas: number;
  nome: string;
  email: string;
  whatsapp: string;
}

interface TipoImovelAPI {
  id: number;
  tipo: string;
}

// Ex: { "enderecos": { "AGUAS CLARAS": { "ADE": ["ADE CONJUNTO 01", ...], ... } } }
type EnderecosAPIResponse = {
  enderecos: Record<string, Record<string, string[]>>;
};

type EnderecosMap = Record<string, Record<string, string[]>>;

const padroesImovel = [
  "ORIGINAL, REQUER MUITOS REPAROS",
  "IMÓVEL PADRÃO, COM MANUTENÇÃO EM DIA",
  "REFORMADO, EM EXCELENTE ESTADO",
];

// Mapeia o texto do select para o valor que a API espera
const estadoConservacaoMap: Record<string, string> = {
  "ORIGINAL, REQUER MUITOS REPAROS": "original",
  "IMÓVEL PADRÃO, COM MANUTENÇÃO EM DIA": "Padrão",
  "REFORMADO, EM EXCELENTE ESTADO": "reformado",
};

export function FormLaudo() {
  const [mode, setMode] = useState<Mode>("precisa");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Novo: estado do botão de gerar laudo
  const [isGeneratingLaudo, setIsGeneratingLaudo] = useState(false);

  const [data, setData] = useState<FormData>({
    tipoImovel: "",
    cidade: "",
    bairro: "",
    endereco: "",
    padraoImovel: "",
    metragem: "",
    quartos: 0,
    suites: 0,
    vagas: 0,
    nome: "",
    email: "",
    whatsapp: "",
  });

  // TIPOS
  const [tiposImovel, setTiposImovel] = useState<TipoImovelAPI[]>([]);
  const [loadingTipos, setLoadingTipos] = useState(false);
  const [errorTipos, setErrorTipos] = useState<string | null>(null);

  // ENDEREÇOS
  const [enderecosMap, setEnderecosMap] = useState<EnderecosMap>({});
  const [loadingEnderecos, setLoadingEnderecos] = useState(false);
  const [errorEnderecos, setErrorEnderecos] = useState<string | null>(null);

  // Controle do dropdown de sugestões de endereço
  const [showEnderecoSuggestions, setShowEnderecoSuggestions] = useState(false);

  // Resultado da API (etapa 4)
  const [apiResult, setApiResult] = useState<any | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Erros de validação (steps 2 e 3)
  const [errors, setErrors] = useState<{
    padraoImovel?: string;
    metragem?: string;
    nome?: string;
    email?: string;
    whatsapp?: string;
  }>({});

  // ------------ CHAMADAS À API ------------

  useEffect(() => {
    const fetchTiposImovel = async () => {
      try {
        setLoadingTipos(true);
        setErrorTipos(null);

        const response = await axios.get(`${host}/api/laudo/tipos`, {
          headers: { Accept: "application/json" },
        });

        if (response.data?.ok && Array.isArray(response.data.tipos)) {
          setTiposImovel(response.data.tipos);
        } else {
          setErrorTipos("Não foi possível carregar os tipos de imóvel.");
        }
      } catch (err) {
        console.error("Erro ao buscar tipos de imóvel:", err);
        setErrorTipos("Erro ao carregar os tipos de imóvel.");
      } finally {
        setLoadingTipos(false);
      }
    };

    fetchTiposImovel();
  }, []);

  useEffect(() => {
    const fetchEnderecos = async () => {
      try {
        setLoadingEnderecos(true);
        setErrorEnderecos(null);

        const response = await axios.get<EnderecosAPIResponse>(
          `${host}/api/laudo/enderecos/df`,
          { headers: { Accept: "application/json" } }
        );

        setEnderecosMap(response.data?.enderecos || {});
      } catch (err) {
        console.error("Erro ao buscar endereços:", err);
        setErrorEnderecos("Erro ao carregar cidades e bairros.");
      } finally {
        setLoadingEnderecos(false);
      }
    };

    fetchEnderecos();
  }, []);

  // ------------ DERIVADOS (Cidade/Bairro/Endereço) ------------

  const cidadesOptions = useMemo(
    () => Object.keys(enderecosMap || {}).sort(),
    [enderecosMap]
  );

  const bairrosOptions = useMemo(() => {
    if (!data.cidade || !enderecosMap[data.cidade]) return [];
    return Object.keys(enderecosMap[data.cidade]).sort();
  }, [data.cidade, enderecosMap]);

  const enderecosOptions = useMemo(() => {
    if (
      !data.cidade ||
      !data.bairro ||
      !enderecosMap[data.cidade] ||
      !enderecosMap[data.cidade][data.bairro]
    ) {
      return [];
    }
    return enderecosMap[data.cidade][data.bairro];
  }, [data.cidade, data.bairro, enderecosMap]);

  const filteredEnderecos = useMemo(() => {
    const query = data.endereco.trim().toLowerCase();

    if (!query) return enderecosOptions.slice(0, 10);
    return enderecosOptions
      .filter((end) => end.toLowerCase().includes(query))
      .slice(0, 30);
  }, [data.endereco, enderecosOptions]);

  // ------------ TÍTULO / SUBTÍTULO ------------
  const isNegative = step === 4 && !!apiResult && apiResult.ok === false;

  const baseTitle =
    mode === "estimativa" ? "Estimativa de preço" : "Avaliação precisa";
  const baseSubtitle =
    mode === "estimativa"
      ? "É tão simples que não leva nem 1 minuto!"
      : "É tão simples que não leva nem 1 minuto!";

  const title = isNegative
    ? ""
    : step === 4
    ? "Obrigado por realizar a avaliação do imóvel conosco!"
    : baseTitle;
  const subtitle = isNegative
    ? ""
    : step === 4
    ? "Com base nos valores que os imóveis têm sido, em média, negociados, nossa inteligência artificial sugere o seguinte valor:"
    : baseSubtitle;

  // Valor a exibir no Step 4 (faixa no modo "estimativa" e valor no modo "precisa")
  const formatBRL = (n?: number | null) => {
    if (n == null || !Number.isFinite(Number(n))) return null;
    try {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 2,
      }).format(Number(n));
    } catch {
      return `R$ ${Number(n).toFixed(2)}`;
    }
  };

  // Novo: util para truncar número
  const toIntFloor = (v: unknown) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.floor(n) : undefined;
  };

  const displayedValue = useMemo(() => {
    if (!apiResult || apiResult.ok !== true) return null;
    const res = (apiResult as any)?.resultado;
    if (!res) return null;

    if (mode === "estimativa") {
      if (res?.formatado_ptbr?.faixa_negociacao) {
        return res.formatado_ptbr.faixa_negociacao;
      }
      const min = formatBRL(res?.faixa_negociacao_min);
      const max = formatBRL(res?.faixa_negociacao_max);
      return min && max ? `${min} a ${max}` : null;
    }

    if (res?.formatado_ptbr?.valor_estimado) {
      return res.formatado_ptbr.valor_estimado;
    }
    return formatBRL(res?.valor_estimado);
  }, [apiResult, mode]);

  const respostaNegativaMsg = useMemo(() => {
    if (apiResult && apiResult.ok === false) {
      return apiResult.mensagem || "Não foi possível gerar o laudo.";
    }
    return null;
  }, [apiResult]);

  // ------------ MÁSCARA WHATSAPP ------------
  const maskWhatsapp = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";
    const ddd = digits.slice(0, 2);
    const is11 = digits.length > 10;
    const parte1 = is11 ? digits.slice(2, 7) : digits.slice(2, 6);
    const parte2 = is11 ? digits.slice(7, 11) : digits.slice(6, 10);
    const base = `(${ddd}${digits.length >= 2 ? ")" : ""}${digits.length >= 2 ? " " : ""}${parte1}`;
    return parte2 ? `${base}-${parte2}` : base;
  };

  // ------------ VALIDAÇÕES ------------

  const isStep1Valid =
    !!data.tipoImovel &&
    !!data.cidade &&
    !!data.bairro &&
    !!data.endereco &&
    !loadingTipos &&
    !loadingEnderecos;

  const isStep2Valid = useMemo(() => {
    const m = Number(data.metragem);
    return !!data.padraoImovel && Number.isFinite(m) && m > 0;
  }, [data.padraoImovel, data.metragem]);

  const isStep3Valid = useMemo(() => {
    const nomeOk = data.nome.trim().length >= 3;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(data.email.trim());
    const digits = data.whatsapp.replace(/\D/g, "");
    const wppOk = digits.length >= 10 && digits.length <= 11;
    return nomeOk && emailOk && wppOk;
  }, [data.nome, data.email, data.whatsapp]);

  const validateStep2 = () => {
    const next: typeof errors = {};
    if (!data.padraoImovel) next.padraoImovel = "Selecione o padrão do imóvel.";
    const m = Number(data.metragem);
    if (!data.metragem || !Number.isFinite(m) || m <= 0) {
      next.metragem = "Informe uma metragem válida.";
    }
    setErrors((prev) => ({
      ...prev,
      padraoImovel: next.padraoImovel,
      metragem: next.metragem,
    }));
    return Object.keys(next).length === 0;
  };

  const validateStep3 = () => {
    const next: typeof errors = {};
    if (data.nome.trim().length < 3) next.nome = "Informe seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(data.email.trim()))
      next.email = "Informe um e-mail válido.";
    const digits = data.whatsapp.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 11)
      next.whatsapp = "Informe um WhatsApp válido.";
    setErrors((prev) => ({
      ...prev,
      nome: next.nome,
      email: next.email,
      whatsapp: next.whatsapp,
    }));
    return Object.keys(next).length === 0;
  };

  // ------------ HANDLERS ------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // máscara específica do WhatsApp
    if (name === "whatsapp") {
      const masked = maskWhatsapp(value);
      setData((prev) => ({ ...prev, whatsapp: masked }));
      setErrors((prev) => ({ ...prev, whatsapp: undefined }));
      return;
    }

    if (name === "cidade") {
      setData((prev) => ({
        ...prev,
        cidade: value,
        bairro: "",
        endereco: "",
      }));
      setShowEnderecoSuggestions(false);
      return;
    }

    if (name === "bairro") {
      setData((prev) => ({
        ...prev,
        bairro: value,
        endereco: "",
      }));
      setShowEnderecoSuggestions(false);
      return;
    }

    setData((prev) => ({ ...prev, [name]: value }));
    if (
      name === "padraoImovel" ||
      name === "metragem" ||
      name === "nome" ||
      name === "email" ||
      name === "whatsapp"
    ) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCounter = (
    field: "quartos" | "suites" | "vagas",
    delta: number
  ) => {
    setData((prev) => {
      const next = Math.max(0, (prev[field] ?? 0) + delta);
      return { ...prev, [field]: next };
    });
  };

  const handleNext = () => {
    // Validação e log da ETAPA 1
    if (step === 1) {
      if (!isStep1Valid) return;

      console.log("Etapa 1 - Dados:", {
        tipoImovel: data.tipoImovel,
        cidade: data.cidade,
        bairro: data.bairro,
        endereco: data.endereco,
      });

      
    }

    if (step === 2) {
      if (!validateStep2()) return;
    }
    if (step < 3) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(null);
    if (!validateStep3()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const params = {
        cidade: data.cidade,
        bairro: data.bairro,
        endereco: data.endereco,
        tipo: data.tipoImovel,
        limite: 20,
        quartos: data.quartos || 0,
        vagas: data.vagas || 0,
        suites: data.suites || 0,
        metragem: data.metragem,
        estado_conservacao: estadoConservacaoMap[data.padraoImovel] ?? "Padrão",
        tolerancia_m2_pct: 0.1,
        tipo_negocio: "Venda",
      };

      const url = `${host}/api/laudo/estimativa`;
      const response = await axios.get(url, {
        params,
        headers: { Accept: "application/json" },
      });

      setApiResult(response.data);

      const ok = response.data.ok === true;
      if (!ok) {
        setApiError(
          response.data.mensagem || "A região não possui dados suficientes."
        );
      }

      // -------- SALVAR HISTÓRICO ANTES DE MOSTRAR RESULTADO --------
      try {
        const res = response.data?.resultado || {};
        const valorEstimadoStr =
          res?.formatado_ptbr?.valor_estimado ??
          (typeof res?.valor_estimado !== "undefined"
            ? formatBRL(res?.valor_estimado)
            : "");
        // usar exatamente o valor da API, truncado para inteiro
        const valorM2Int = toIntFloor(res?.valor_m2_ponderado);

        const salvarUrl = `${gatewayHost}/api/laudo/historico/salvar`;
        await axios.post(
          salvarUrl,
          {
            nome: data.nome,
            email: data.email,
            whatsapp: data.whatsapp,
            sucess: ok,
            json_imovel: {
              bairro: data.bairro,
              cidade: data.cidade,
              endereco: data.endereco,
              estado_conservacao:
                estadoConservacaoMap[data.padraoImovel] ?? "Padrão",
              tipo: data.tipoImovel,
              quartos: data.quartos || 0,
              suites: data.suites || 0,
              vagas: data.vagas || 0,
              metragem: data.metragem,
              valor_m2_ponderado: valorM2Int, // inteiro sem decimais
              valor_imovel: valorEstimadoStr,
              valor_estimado: valorEstimadoStr,
            },
            json_user: {
              nome: data.nome,
              email: data.email,
              whatsapp: data.whatsapp.replace(/\D/g, ""),
            },
            json_api: response.data,
            origem: "lp-web-app",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
      } catch (err) {
        console.warn("Falha ao salvar histórico inicial:", err);
      }
      // ------------------------------------------------------------

      setStep(4);

      console.log("dados do usuario:", {
        nome: data.nome,
        email: data.email,
        whatsapp: data.whatsapp,
      });
      console.log("Resposta da API:", response.data);
    } catch (error: any) {
      console.error("Erro ao chamar a API de estimativa:", error);
      setApiError("Ocorreu um erro ao calcular a estimativa.");

      // Salvar histórico com falha também
      try {
        const salvarUrl = `${gatewayHost}/api/laudo/historico/salvar`;
        await axios.post(
          salvarUrl,
          {
            nome: data.nome,
            email: data.email,
            whatsapp: data.whatsapp,
            sucess: false,
            json_imovel: {
              bairro: data.bairro,
              cidade: data.cidade,
              endereco: data.endereco,
              estado_conservacao:
                estadoConservacaoMap[data.padraoImovel] ?? "Padrão",
              tipo: data.tipoImovel,
              quartos: data.quartos || 0,
              suites: data.suites || 0,
              vagas: data.vagas || 0,
              metragem: data.metragem,
            },
            json_user: {
              nome: data.nome,
              email: data.email,
              whatsapp: data.whatsapp.replace(/\D/g, ""),
            },
            json_api: { ok: false, mensagem: "Erro na estimativa" },
            origem: "web-app",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
      } catch {
        // silencioso
      }

      setStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeMode = (newMode: Mode) => {
    setMode(newMode);
    setStep(1);
  };

  const handleSelectEndereco = (enderecoSelecionado: string) => {
    setData((prev) => ({ ...prev, endereco: enderecoSelecionado }));
    setShowEnderecoSuggestions(false);
  };

  // ------------ RENDER ------------

  // Novo: função para gerar e baixar o laudo + salvar histórico
  const handleGerarLaudo = async () => {
    if (!apiResult || apiResult.ok !== true) return;
    setIsGeneratingLaudo(true);
    try {
      const res = (apiResult as any)?.resultado || {};
      const valorEstimadoStr =
        res?.formatado_ptbr?.valor_estimado ??
        (typeof res?.valor_estimado !== "undefined"
          ? formatBRL(res?.valor_estimado)
          : "");
      // usar exatamente o valor da API, truncado para inteiro
      const valorM2Int = toIntFloor(res?.valor_m2_ponderado);
      const estadoConservacao =
        estadoConservacaoMap[data.padraoImovel] ?? "Padrão";

      const gerarPayload = {
        bairro: data.bairro,
        cidade: data.cidade,
        endereco: data.endereco,
        estado_conservacao: estadoConservacao,
        tipo: data.tipoImovel,
        quartos: data.quartos || 0,
        suites: data.suites || 0,
        vagas: data.vagas || 0,
        metragem: data.metragem,
        valor_m2_ponderado: valorM2Int, // inteiro sem decimais
        valor_estimado: valorEstimadoStr,
      };

      const gerarUrl = `${gatewayHost}/api/laudo/gerar`;
      const gerarResp = await axios.post(gerarUrl, gerarPayload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const docxResp = gerarResp.data?.docx_response;
      if (docxResp?.pdf_url) {
        const a = document.createElement("a");
        a.href = docxResp.pdf_url;
        a.download = docxResp.pdf_name || "laudo-avaliativo.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.warn("pdf_url ausente na resposta.");
      }
    } catch (err) {
      console.error("Erro ao gerar/baixar o laudo:", err);
    } finally {
      setIsGeneratingLaudo(false);
    }
  };

  return (
    <div className={styles.formLaudo}>
      <div className={styles.card}>
        {/* HEADER / TABS */}
        <div className={styles.tabsWrapper}>
          <button
            type="button"
            className={`${styles.tab} ${
              mode === "estimativa" ? styles.tabActive : styles.tabInactive
            }`}
            onClick={() => changeMode("estimativa")}
          >
            Estimativa de preço
          </button>
          <button
            type="button"
            className={`${styles.tab} ${
              mode === "precisa" ? styles.tabActive : styles.tabInactive
            }`}
            onClick={() => changeMode("precisa")}
          >
            Avaliação precisa
          </button>
        </div>

        {/* TÍTULO E SUBTÍTULO */}
        <div className={styles.headerText}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        {/* FORM ou RESULTADO (etapa 4) */}
        {step !== 4 ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* STEP 1 */}
            {step === 1 && (
              <>
                {/* Tipo de imóvel */}
                <div className={styles.field}>
                  <label htmlFor="tipoImovel">
                    Tipo de imóvel <span>*</span>
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="tipoImovel"
                      name="tipoImovel"
                      value={data.tipoImovel}
                      onChange={handleChange}
                      disabled={loadingTipos}
                    >
                      {loadingTipos ? (
                        <option value="" disabled>
                          Carregando tipos...
                        </option>
                      ) : (
                        <option value="" disabled>
                          Tipo de imóvel
                        </option>
                      )}
                      {tiposImovel.map((opt) => (
                        <option key={opt.id} value={opt.tipo}>
                          {opt.tipo}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errorTipos && (
                    <small className={styles.errorText}>{errorTipos}</small>
                  )}
                </div>

                {/* Cidade */}
                <div className={styles.field}>
                  <label htmlFor="cidade">
                    Cidade <span>*</span>
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="cidade"
                      name="cidade"
                      value={data.cidade}
                      onChange={handleChange}
                      disabled={loadingEnderecos}
                    >
                      {loadingEnderecos ? (
                        <option value="" disabled>
                          Carregando cidades...
                        </option>
                      ) : (
                        <option value="" disabled>
                          Cidade
                        </option>
                      )}
                      {cidadesOptions.map((cidade) => (
                        <option key={cidade} value={cidade}>
                          {cidade}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bairro */}
                <div className={styles.field}>
                  <label htmlFor="bairro">
                    Bairro <span>*</span>
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="bairro"
                      name="bairro"
                      value={data.bairro}
                      onChange={handleChange}
                      disabled={!data.cidade || loadingEnderecos}
                    >
                      {!data.cidade ? (
                        <option value="" disabled>
                          Selecione a cidade
                        </option>
                      ) : (
                        <option value="" disabled>
                          Bairro
                        </option>
                      )}
                      {bairrosOptions.map((bairro) => (
                        <option key={bairro} value={bairro}>
                          {bairro}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errorEnderecos && (
                    <small className={styles.errorText}>{errorEnderecos}</small>
                  )}
                </div>

                {/* Endereço com autocomplete custom */}
                <div className={styles.field}>
                  <label htmlFor="endereco">
                    Endereço <span>*</span>
                  </label>

                  <div className={styles.enderecoWrapper}>
                    <input
                      id="endereco"
                      name="endereco"
                      type="text"
                      placeholder={
                        data.bairro
                          ? "Digite para buscar o endereço..."
                          : "Selecione cidade e bairro primeiro"
                      }
                      value={data.endereco}
                      onChange={(e) => {
                        const value = e.target.value;
                        setData((prev) => ({
                          ...prev,
                          endereco: value,
                        }));
                        if (value && enderecosOptions.length > 0) {
                          setShowEnderecoSuggestions(true);
                        } else {
                          setShowEnderecoSuggestions(false);
                        }
                      }}
                      onFocus={() => {
                        if (enderecosOptions.length > 0) {
                          setShowEnderecoSuggestions(true);
                        }
                      }}
                      onBlur={() => {
                        // pequeno delay pra permitir clique nas sugestões
                        setTimeout(() => {
                          setShowEnderecoSuggestions(false);
                        }, 150);
                      }}
                      disabled={!data.bairro || enderecosOptions.length === 0}
                    />

                    {showEnderecoSuggestions &&
                      filteredEnderecos.length > 0 && (
                        <div className={styles.enderecoSuggestions}>
                          {filteredEnderecos.map((end) => (
                            <button
                              key={end}
                              type="button"
                              className={styles.enderecoOption}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                handleSelectEndereco(end);
                              }}
                            >
                              {end}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <div className={styles.field}>
                  <label htmlFor="padraoImovel">
                    Padrão atual do imóvel <span>*</span>
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="padraoImovel"
                      name="padraoImovel"
                      value={data.padraoImovel}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Padrão do imóvel
                      </option>
                      {padroesImovel.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.padraoImovel && (
                    <small className={styles.errorText}>{errors.padraoImovel}</small>
                  )}
                </div>

                {/* Linha da metragem */}
                <div className={`${styles.field} ${styles.metragemField}`}>
                  <div className={styles.metragemLabelBox}>
                    <label htmlFor="metragem">
                      Metragem do imóvel <span>*</span>
                    </label>
                  </div>
                  <div className={styles.metragemWrapper}>
                    <input
                      id="metragem"
                      name="metragem"
                      type="number"
                      min={1}
                      value={data.metragem}
                      onChange={handleChange}
                      required
                    />
                    <span className={styles.m2}>m²</span>
                  </div>
                  {errors.metragem && (
                    <small className={styles.errorText}>{errors.metragem}</small>
                  )}
                </div>

                {/* Linha de quartos + suítes */}
                <div className={styles.fieldRow}>
                  <div className={styles.fieldHalf}>
                    <label>Nº quartos (opcional)</label>
                    <div className={styles.counter}>
                      <button
                        type="button"
                        onClick={() => handleCounter("quartos", -1)}
                      >
                        −
                      </button>
                      <span>{data.quartos}</span>
                      <button
                        type="button"
                        onClick={() => handleCounter("quartos", 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className={styles.fieldHalf}>
                    <label>Nº suítes (opcional)</label>
                    <div className={styles.counter}>
                      <button
                        type="button"
                        onClick={() => handleCounter("suites", -1)}
                      >
                        −
                      </button>
                      <span>{data.suites}</span>
                      <button
                        type="button"
                        onClick={() => handleCounter("suites", 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Campo de vagas separado */}
                <div className={styles.field}>
                  <label>Nº vagas (opcional)</label>
                  <div className={styles.counter}>
                    <button
                      type="button"
                      onClick={() => handleCounter("vagas", -1)}
                    >
                      −
                    </button>
                    <span>{data.vagas}</span>
                    <button
                      type="button"
                      onClick={() => handleCounter("vagas", 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <div className={styles.field}>
                  <label htmlFor="nome">
                    Nome <span>*</span>
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Ex: Maria da Silva Souza"
                    value={data.nome}
                    onChange={handleChange}
                    required
                  />
                  {errors.nome && (
                    <small className={styles.errorText}>{errors.nome}</small>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="email">
                    E-mail <span>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Ex: maria@email.com"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <small className={styles.errorText}>{errors.email}</small>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="whatsapp">
                    Whatsapp <span>*</span>
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={data.whatsapp}
                    onChange={handleChange}
                    inputMode="numeric"
                    maxLength={15}
                    required
                  />
                  {errors.whatsapp && (
                    <small className={styles.errorText}>{errors.whatsapp}</small>
                  )}
                </div>
              </>
            )}

            {/* PROGRESS */}
            <div className={styles.progress}>
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`${styles.progressSegment} ${
                    step >= s ? styles.progressActive : ""
                  }`}
                />
              ))}
            </div>

            {/* BOTÕES */}
            <div className={styles.actions}>
              {step === 1 && (
                <button
                  type="button"
                  className={`${styles.primaryButton} ${
                    !isStep1Valid ? styles.primaryButtonDisabled : ""
                  }`}
                  onClick={handleNext}
                  disabled={!isStep1Valid}
                >
                  Próximo
                </button>
              )}

              {step === 2 && (
                <>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={handleBack}
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    className={`${styles.primaryButton} ${
                      !isStep2Valid ? styles.primaryButtonDisabled : ""
                    }`}
                    onClick={handleNext}
                    disabled={!isStep2Valid}
                  >
                    Próximo
                  </button>
                </>
              )}

              {step === 3 && (
                <button
                  type="submit"
                  className={`${styles.primaryButton} ${
                    (!isStep3Valid || isSubmitting) ? styles.primaryButtonDisabled : ""
                  }`}
                  disabled={isSubmitting || !isStep3Valid}
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className={styles.result}>
            {isSubmitting ? (
              <p>Carregando resultado...</p>
            ) : isNegative ? (
              <div className={styles.resultInner}>
                <h3 className={styles.resultValue}>
                  {respostaNegativaMsg || "Não foi possível gerar o laudo."}
                </h3>
                {apiResult?.detalhes && (
                  <pre className={styles.resultJson}>
                    {JSON.stringify(apiResult.detalhes, null, 2)}
                  </pre>
                )}
              </div>
             ) : apiError && !apiResult ? (
               <div className={styles.errorText}>{apiError}</div>
             ) : apiResult ? (
               <div className={styles.resultInner}>
                 {displayedValue && (
                   <h3 className={styles.resultValue}>{displayedValue}</h3>
                 )}
               </div>
             ) : (
               <p>Nenhum resultado disponível.</p>
             )}

            <div className={`${styles.actions} ${styles.resultActions}`}>
              {/* Novo: botão para gerar/baixar laudo quando ok === true */}
              {apiResult?.ok === true && !isNegative && (
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={handleGerarLaudo}
                  disabled={isGeneratingLaudo}
                >
                  {isGeneratingLaudo ? "Gerando Laudo Avaliativo" : "Baixar Laudo Avaliativo"}
                </button>
              )}

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => {
                  setStep(1);
                  setApiResult(null);
                  setApiError(null);
                  setErrors({});
                  setData({
                    tipoImovel: "",
                    cidade: "",
                    bairro: "",
                    endereco: "",
                    padraoImovel: "",
                    metragem: "",
                    quartos: 0,
                    suites: 0,
                    vagas: 0,
                    nome: "",
                    email: "",
                    whatsapp: "",
                  });
                }}
              >
                Fazer uma nova consulta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}