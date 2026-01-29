import styles from "./styles.module.css";

// import info1 from "../../assets/img/info1.png";
// import info2 from "../../assets/img/info2.png";
// import info3 from "../../assets/img/info3.png";

export function SectionInfo() {
  return (
    <section className={styles.sectionInfo}>
      <div className={styles.container}>
        {/* Título */}
        <h2 className={styles.title}>
          Como a imo<span>Go</span> chega neste valor?
        </h2>

        {/* Blocos de info */}
        <div className={styles.infos}>
          <div className={styles.infoItem}>
            {/* <img src={info1} alt="Dados recentes das propriedades" /> */}
            <p>
              Nossa IA reúne os dados recentes das propriedades e realiza a análise
            </p>
          </div>

          <div className={styles.infoItem}>
            {/* <img src={info2} alt="Imóveis similares" /> */}
            <p>
              Consideramos imóveis a venda e vendidos com características similares
            </p>
          </div>

          <div className={styles.infoItem}>
            {/* <img src={info3} alt="Estudo de mercado" /> */}
            <p>
              Com o estudo de mercado é indicado um valor para a negociação
            </p>
          </div>
        </div>

        {/* Texto footer */}
        <p className={styles.footerText}>
          Quanto mais a inteligência conhece <span>seu imóvel</span>, mais
          precisa se torna a avaliação.
        </p>
      </div>
    </section>
  );
}