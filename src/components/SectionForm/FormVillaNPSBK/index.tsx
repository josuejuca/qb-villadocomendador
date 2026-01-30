// FormVillaNPS/index.tsx
import React, { useMemo, useState } from "react";
import styles from "./styles.module.css";

type Satisfacao =
  | "Muito insatisfeito"
  | "Insatisfeito"
  | "Indiferente"
  | "Satisfeito"
  | "Muito satisfeito";

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  imovelUnidade: string;

  corretor: Satisfacao | "";
  gerente: Satisfacao | "";
  processoCompra: Satisfacao | "";

  nps: number | null;
  justificativa: string;
};

const SATISFACAO_OPCOES: Satisfacao[] = [
  "Muito insatisfeito",
  "Insatisfeito",
  "Indiferente",
  "Satisfeito",
  "Muito satisfeito",
];

function validarEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** máscara simples BR: (DD) 9XXXX-XXXX */
function maskTelefoneBR(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const ddd = digits.slice(0, 2);
  const n1 = digits.slice(2, 3);
  const p1 = digits.slice(3, 7);
  const p2 = digits.slice(7, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 3) return `(${ddd}) ${n1}`;
  if (digits.length <= 7) return `(${ddd}) ${n1}${p1 ? p1 : ""}`;
  return `(${ddd}) ${n1}${p1}-${p2}`;
}

function isTelefoneValido(telefone: string) {
  // Espera 11 dígitos (inclui 9º dígito)
  return telefone.replace(/\D/g, "").length === 11;
}

export function FormVillaNPS() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);

  const [data, setData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    imovelUnidade: "",

    corretor: "",
    gerente: "",
    processoCompra: "",

    nps: null,
    justificativa: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const progress = useMemo(() => {
    if (step === 1) return 33;
    if (step === 2) return 66;
    return 100;
  }, [step]);

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const markTouched = (key: keyof FormData) =>
    setTouched((prev) => ({ ...prev, [key]: true }));

  const errorsStep1 = useMemo(() => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!data.nome.trim()) e.nome = "Informe seu nome.";
    if (!data.email.trim()) e.email = "Informe seu e-mail.";
    else if (!validarEmail(data.email)) e.email = "E-mail inválido.";
    if (!data.telefone.trim()) e.telefone = "Informe seu telefone.";
    else if (!isTelefoneValido(data.telefone))
      e.telefone = "Telefone inválido (use DDD + 9 dígitos).";
    if (!data.imovelUnidade.trim())
      e.imovelUnidade = "Informe qual imóvel e unidade você comprou.";
    return e;
  }, [data]);

  const errorsStep2 = useMemo(() => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!data.corretor) e.corretor = "Selecione uma opção.";
    if (!data.gerente) e.gerente = "Selecione uma opção.";
    if (!data.processoCompra) e.processoCompra = "Selecione uma opção.";
    return e;
  }, [data]);

  const errorsStep3 = useMemo(() => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (data.nps === null) e.nps = "Selecione uma nota de 0 a 10.";
    return e;
  }, [data]);

  const canGoNextStep1 = Object.keys(errorsStep1).length === 0;
  const canGoNextStep2 = Object.keys(errorsStep2).length === 0;
  const canSubmit = Object.keys(errorsStep3).length === 0;

  function next() {
    if (step === 1) {
      // marca tudo do step 1 como touched pra exibir erro se faltar algo
      (["nome", "email", "telefone", "imovelUnidade"] as (keyof FormData)[]).forEach(
        markTouched
      );
      if (!canGoNextStep1) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      (["corretor", "gerente", "processoCompra"] as (keyof FormData)[]).forEach(
        markTouched
      );
      if (!canGoNextStep2) return;
      setStep(3);
    }
  }

  function back() {
    if (step === 2) return setStep(1);
    if (step === 3) return setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    markTouched("nps");
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      // TODO: conecte no seu endpoint (exemplo):
      // await fetch("/api/nps", { method: "POST", headers: { "Content-Type":"application/json" }, body: JSON.stringify(data) });

      // Simula envio
      await new Promise((r) => setTimeout(r, 700));

      // Você pode trocar por um estado de "sucesso" e mostrar msg.
      alert("Resposta enviada! Obrigado 🙂");
      setStep(1);
      setTouched({});
      setData({
        nome: "",
        email: "",
        telefone: "",
        imovelUnidade: "",
        corretor: "",
        gerente: "",
        processoCompra: "",
        nps: null,
        justificativa: "",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h3 className={styles.heading}>Pesquisa de satisfação</h3>
          <span className={styles.stepTag}>Etapa {step}/3</span>
        </div>

        <p className={styles.subheading}>
          Leva poucos minutos. Sua resposta ajuda a Quadraimob a melhorar cada vez mais.
        </p>

        <div className={styles.progress} aria-hidden="true">
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
      </header>

      {/* STEP 1 */}
      {step === 1 && (
        <section className={styles.section}>
          <div className={styles.field}>
            <label className={styles.label}>
              Nome <span className={styles.req}>*</span>
            </label>
            <input
              className={styles.input}
              value={data.nome}
              onChange={(ev) => setField("nome", ev.target.value)}
              onBlur={() => markTouched("nome")}
              placeholder="Seu nome completo"
              autoComplete="name"
            />
            {touched.nome && errorsStep1.nome && (
              <p className={styles.error}>{errorsStep1.nome}</p>
            )}
          </div>

          <div className={styles.fieldGrid}>
            <div className={styles.field}>
              <label className={styles.label}>
                E-mail <span className={styles.req}>*</span>
              </label>
              <input
                className={styles.input}
                value={data.email}
                onChange={(ev) => setField("email", ev.target.value)}
                onBlur={() => markTouched("email")}
                placeholder="seuemail@exemplo.com"
                autoComplete="email"
                inputMode="email"
              />
              {touched.email && errorsStep1.email && (
                <p className={styles.error}>{errorsStep1.email}</p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Telefone <span className={styles.req}>*</span>
              </label>
              <input
                className={styles.input}
                value={data.telefone}
                onChange={(ev) => setField("telefone", maskTelefoneBR(ev.target.value))}
                onBlur={() => markTouched("telefone")}
                placeholder="(61) 9XXXX-XXXX"
                inputMode="tel"
                autoComplete="tel"
              />
              {touched.telefone && errorsStep1.telefone && (
                <p className={styles.error}>{errorsStep1.telefone}</p>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Qual imóvel e unidade você comprou com a quadraimob?{" "}
              <span className={styles.req}>*</span>
            </label>
            <input
              className={styles.input}
              value={data.imovelUnidade}
              onChange={(ev) => setField("imovelUnidade", ev.target.value)}
              onBlur={() => markTouched("imovelUnidade")}
              placeholder="Ex.: Residencial X — Bloco A, Apto 1204"
            />
            {touched.imovelUnidade && errorsStep1.imovelUnidade && (
              <p className={styles.error}>{errorsStep1.imovelUnidade}</p>
            )}
          </div>
        </section>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <section className={styles.section}>
          <div className={styles.question}>
            <p className={styles.qTitle}>
              Como você avalia o atendimento do corretor (conhecimento, clareza nas
              informações, tratamento e agilidade)? <span className={styles.req}>*</span>
            </p>
            <div className={styles.choices}>
              {SATISFACAO_OPCOES.map((opt) => (
                <label key={`corretor-${opt}`} className={styles.choice}>
                  <input
                    type="radio"
                    name="corretor"
                    value={opt}
                    checked={data.corretor === opt}
                    onChange={() => setField("corretor", opt)}
                    onBlur={() => markTouched("corretor")}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            {touched.corretor && errorsStep2.corretor && (
              <p className={styles.error}>{errorsStep2.corretor}</p>
            )}
          </div>

          <div className={styles.question}>
            <p className={styles.qTitle}>
              Você foi atendido por algum de nossos gerentes? Se sim, como foi esse
              atendimento (conhecimento, clareza nas informações, tratamento e agilidade)?{" "}
              <span className={styles.req}>*</span>
            </p>
            <div className={styles.choices}>
              {SATISFACAO_OPCOES.map((opt) => (
                <label key={`gerente-${opt}`} className={styles.choice}>
                  <input
                    type="radio"
                    name="gerente"
                    value={opt}
                    checked={data.gerente === opt}
                    onChange={() => setField("gerente", opt)}
                    onBlur={() => markTouched("gerente")}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            {touched.gerente && errorsStep2.gerente && (
              <p className={styles.error}>{errorsStep2.gerente}</p>
            )}
          </div>

          <div className={styles.question}>
            <p className={styles.qTitle}>
              Como você avalia o processo de <strong>COMPRA</strong> do seu imóvel em
              relação às responsabilidades da imobiliária quadraimob (confecção de
              contrato e esclarecimento de dúvidas)? <span className={styles.req}>*</span>
            </p>
            <div className={styles.choices}>
              {SATISFACAO_OPCOES.map((opt) => (
                <label key={`processo-${opt}`} className={styles.choice}>
                  <input
                    type="radio"
                    name="processoCompra"
                    value={opt}
                    checked={data.processoCompra === opt}
                    onChange={() => setField("processoCompra", opt)}
                    onBlur={() => markTouched("processoCompra")}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            {touched.processoCompra && errorsStep2.processoCompra && (
              <p className={styles.error}>{errorsStep2.processoCompra}</p>
            )}
          </div>
        </section>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <section className={styles.section}>
          <div className={styles.question}>
            <p className={styles.qTitle}>
              De <strong>0 a 10</strong>, qual a chance de você indicar a quadraimob a um
              amigo ou familiar? <span className={styles.req}>*</span>
            </p>

            <div className={styles.npsScale} role="radiogroup" aria-label="Escala NPS 0 a 10">
              {Array.from({ length: 11 }).map((_, i) => {
                const active = data.nps === i;
                return (
                  <button
                    key={`nps-${i}`}
                    type="button"
                    className={`${styles.npsBtn} ${active ? styles.npsBtnActive : ""}`}
                    onClick={() => setField("nps", i)}
                    aria-pressed={active}
                  >
                    {i}
                  </button>
                );
              })}
            </div>

            <div className={styles.npsHint}>
              <span>0 = nada provável</span>
              <span>10 = muito provável</span>
            </div>

            {touched.nps && errorsStep3.nps && <p className={styles.error}>{errorsStep3.nps}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Gostaria de justificar sua nota?</label>
            <textarea
              className={styles.textarea}
              value={data.justificativa}
              onChange={(ev) => setField("justificativa", ev.target.value)}
              placeholder="Se quiser, conte rapidamente o motivo da sua nota."
              rows={4}
            />
          </div>
        </section>
      )}

      <footer className={styles.footer}>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={back}
          disabled={step === 1 || submitting}
        >
          Voltar
        </button>

        {step < 3 ? (
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={next}
            disabled={(step === 1 && !canGoNextStep1) || (step === 2 && !canGoNextStep2) || submitting}
          >
            Próximo
          </button>
        ) : (
          <button
            type="submit"
            className={`${styles.btn} ${styles.btnPrimary}`}
            disabled={!canSubmit || submitting}
          >
            {submitting ? "Enviando..." : "Enviar"}
          </button>
        )}
      </footer>
    </form>
  );
}
