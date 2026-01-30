import styles from "./styles.module.css";

export function Regulamento() {
  const email = "reserva@grupovillahoteis.com.br";

  return (
    <section className={styles.sectionGallery}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Regulamento</h2>
            <p className={styles.subtitle}>Regulamento da campanha</p>
            <div className={styles.line} />
          </div>
        </div>

        <p className={styles.intro}>
          <strong>POLÍTICA DE HOSPEDAGEM, ALTERAÇÃO E CANCELAMENTO</strong>
          <br />
          Todas as solicitações referentes a reservas, alterações, cancelamentos e demais informações devem
          ser enviadas exclusivamente para o e-mail:{" "}
          <a className={styles.link} href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p>

        <div className={styles.faq}>
          <details className={styles.item}>
            <summary className={styles.question}>I – Alteração de data</summary>
            <div className={styles.answer}>
              <p>
                A alteração de data deverá ser solicitada exclusivamente por e-mail ({" "}
                <a className={styles.link} href={`mailto:${email}`}>
                  {email}
                </a>
                ).
              </p>
              <p>
                Para reservas alteradas, em caso de cancelamento, serão aplicadas as mesmas regras do item II
                (Cancelamento), considerando a nova data reservada.
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>II – Cancelamento</summary>
            <div className={styles.answer}>
              <p>
                As solicitações de cancelamento devem ser realizadas exclusivamente por e-mail ({" "}
                <a className={styles.link} href={`mailto:${email}`}>
                  {email}
                </a>
                ).
              </p>
              <p>
                Será adotada a seguinte política, conforme o número de dias anteriores à data prevista para o
                check-in:
              </p>

              <ul className={styles.list}>
                <li>
                  Cancelamento com até 30 (trinta) dias antes da data de entrada: 100% em carta de crédito para
                  agendamento em data futura ou devolução integral.
                </li>
                <li>
                  Cancelamento com até 15 (quinze) dias antes da data de entrada: multa de 15% (quinze por
                  cento) do valor depositado.
                </li>
                <li>
                  Cancelamento com até 7 (sete) dias antes da data de entrada: multa de 25% (vinte e cinco por
                  cento) do valor depositado.
                </li>
                <li>
                  Cancelamento com até 3 (três) dias antes da data de entrada: multa de 50% (cinquenta por
                  cento) do valor depositado.
                </li>
                <li>
                  Cancelamento com menos de 3 (três) dias antes da data de entrada: multa de 100% (cem por
                  cento) do valor depositado.
                </li>
              </ul>

              <p>
                <strong>Desistência após o check-in ou saída antecipada:</strong> será cobrado o valor total do
                pacote contratado, sem direito a restituição.
              </p>
              <p>
                <strong>Desistência sem cancelamento (no show):</strong> retenção de 100% (cem por cento) do
                valor pago.
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>III – Outras solicitações</summary>
            <div className={styles.answer}>
              <p>
                Qualquer solicitação relacionada à reserva, pagamento ou hospedagem deverá ser realizada
                exclusivamente por e-mail:{" "}
                <a className={styles.link} href={`mailto:${email}`}>
                  {email}
                </a>
                .
              </p>
              <p>
                Todas as ligações realizadas para a nossa Central de Reservas nos números (+55 62) 3142-5866 /
                3142-7100 são gravadas para fins de segurança, controle de qualidade e aprimoramento do
                atendimento.
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>IV – Condições de pagamento (Cartão de Crédito)</summary>
            <div className={styles.answer}>
              <p>
                O pagamento efetuado via cartão de crédito deverá ser realizado pelo titular da reserva online,
                sendo indispensável a apresentação dos documentos de identificação no momento do check-in.
              </p>
              <p>
                <strong>
                  1.1 Caso o cartão utilizado não seja do titular da reserva, será obrigatório o envio da
                  autorização de débito assinada
                </strong>
                , junto com cópias do RG e CPF do titular, no prazo de até 48 horas após a efetivação da
                reserva.
              </p>
              <p>O não envio da documentação implicará na cobrança no momento do check-in.</p>
              <p>
                (Solicitações e envios de documentação deverão ser feitos exclusivamente por e-mail:{" "}
                <a className={styles.link} href={`mailto:${email}`}>
                  {email}
                </a>
                .)
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>V – Hospedagem de menores de 18 anos</summary>
            <div className={styles.answer}>
              <p>
                De acordo com os arts. 82 e 250 do Estatuto da Criança e do Adolescente (Lei nº 8.069/1990,
                com redação dada pela Lei nº 12.038/2009), é proibida a hospedagem de crianças ou adolescentes
                desacompanhados dos pais ou responsável legal.
              </p>
              <p>
                Será obrigatória a apresentação de autorização por escrito, autenticada em cartório, além dos
                documentos da criança ou adolescente, no momento do check-in.
              </p>
              <p>
                (Solicitações relacionadas deverão ser feitas exclusivamente por e-mail:{" "}
                <a className={styles.link} href={`mailto:${email}`}>
                  {email}
                </a>
                .)
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>VI – Horários</summary>
            <div className={styles.answer}>
              <p>
                <strong>Check-in:</strong> 15h
                <br />
                <strong>Check-out:</strong> 12h
              </p>
              <p>
                Em conformidade com a nova regulamentação que estabelece que a diária deve ter duração de 24
                horas (com 3 horas destinadas à arrumação), informamos que o acesso às áreas de lazer é
                permitido a partir das 12h, enquanto o hóspede aguarda a liberação da acomodação, prevista
                para as 15h.
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>VII – Alimentos, bebidas e serviços terceirizados</summary>
            <div className={styles.answer}>
              <p>
                O setor de gastronomia e spa são terceirizados, e suas políticas de reservas, cardápios e
                eventos são de responsabilidade exclusiva dos parceiros.
              </p>
              <p>
                Para garantir a segurança alimentar e a preservação ambiental, não é permitido trazer
                alimentos ou bebidas sem autorização prévia. O descumprimento poderá resultar em multa ou
                proibição do uso e consumo nas dependências.
              </p>
              <p>
                Todas as solicitações referentes a reservas, alterações, cancelamentos e demais informações
                devem ser enviadas exclusivamente para o e-mail:{" "}
                <a className={styles.link} href={`mailto:${email}`}>
                  {email}
                </a>
                .
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>VIII – Animais de estimação / Pet</summary>
            <div className={styles.answer}>
              <p>A pousada adota uma política institucional de não hospedagem de animais.</p>
              <p>
                Mais informações (animais de estimação / pet):{" "}
                <a className={styles.link} href={`mailto:${email}`}>
                  {email}
                </a>
                .
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
