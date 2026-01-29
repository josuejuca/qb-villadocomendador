import styles from "./styles.module.css";

export function SectionForm() {
  return (
    <section className={styles.sectionForm}>
      {/* Background Video */}
      <div className={styles.backgroundVideo} aria-hidden="true">
        <iframe
          src="https://www.youtube.com/embed/Zz2ZmGWsWlY?autoplay=1&mute=1&loop=1&playlist=Zz2ZmGWsWlY&controls=0&rel=0&modestbranding=1&playsinline=1"
          title="Vídeo de fundo"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
        />
      </div>

      <div className={styles.overlay} />

      <div className={styles.container}>
        {/* Coluna esquerda */}
        <div className={styles.content}>
          <p className={styles.subtitle}>
            Campanha exclusiva Quadraimob
          </p>

          <h1 className={styles.title}>
            Responda nossa pesquisa de satisfação e concorra a{" "}
            <span>2 diárias para casal</span>
          </h1>

          <div className={styles.line} />

          <p className={styles.description}>
            Um refúgio de charme em meio à natureza — perfeito para
            desacelerar, curtir a dois e viver dias inesquecíveis.
          </p>

          <ul className={styles.list}>
            <li>2 diárias para casal na Suíte Standard</li>
            <li>Exclusivo para clientes compradores da Quadraimob</li>
            <li>Responder à pesquisa leva apenas alguns minutos</li>
            <li>Uso da diária por até 3 meses após o sorteio</li>
          </ul>

          <p className={styles.footerText}>
            Sorteio válido para clientes compradores de qualquer imóvel com
            intermediação da Quadraimob que responderem à pesquisa. A diária
            poderá ser utilizada no período de 01/04/2026 a 30/06/2026.
          </p>
        </div>

        {/* Coluna direita (form) */}
        <div className={styles.formWrapper}>
          <div className={styles.formPlaceholder}>
            {/* FORM VAI AQUI */}
          </div>
        </div>
      </div>
    </section>
  );
}
