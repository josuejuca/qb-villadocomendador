import styles from "./styles.module.css";

export function SectionForm() {
  return (
    <section className={styles.sectionForm}>
      <div className={styles.backgroundVideo} aria-hidden="true">
        <iframe
          src="https://www.youtube.com/embed/Zz2ZmGWsWlY?autoplay=1&mute=1&loop=1&playlist=Zz2ZmGWsWlY&controls=0&rel=0&modestbranding=1&playsinline=1"
          title="Vídeo de fundo"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className={styles.backgroundOverlay} aria-hidden="true" />
      <div className={styles.wrapper}>
        {/* Coluna esquerda */}
        <div className={styles.left}>
          <div className={styles.leftInner}>
            <p className={styles.subheading}>
              Campanha exclusiva quadraimob 
            </p>

            <h1 className={styles.title}>
              Responda nossa pesquisa de satisfação e concorra a 2 diárias para casal
            </h1>

            <p className={styles.text}>Um refúgio de charme em meio à natureza — perfeito para desacelerar,
              curtir a dois e viver dias inesquecíveis.</p>

            <ul className={styles.list}>
              <li>Prêmio: 2 diárias para casal na Suíte Standard;</li>
              <li>Participação válida para clientes compradores com intermediação da Quadraimob;</li>
              <li>Responder à pesquisa leva poucos minutos;</li>
              <li>Uso da diária por até 3 meses após o sorteio.</li>
            </ul>

            <p className={styles.footerText}>
              Sorteio válido para clientes compradores de qualquer imóvel com intermediação da quadraimob que responderem à pesquisa. A diária será válida para utilização por até 3 (três) meses após a realização do sorteio, podendo ser agendada no período de 01/04/2026 a 30/06/2026.
            </p>
          </div>
        </div>

        {/* Coluna direita (form) */}
        <div className={styles.right}>
          <div className={styles.rightInner}>
            <div className={styles.formPlaceholder}>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}