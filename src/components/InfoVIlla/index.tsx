import styles from "./styles.module.css";
import img from "../../assets/img/photos/02.webp";

export function InfoVilla() {
  return (
    <section className={styles.sectionInfoVilla}>
      <div className={styles.container}>
        
        {/* Texto */}
        <div className={styles.content}>
          <p className={styles.subtitle}>
            Sobre a Villa do Comendador
          </p>

          <h2 className={styles.title}>
            Villa do <br /> Comendador
          </h2>

          <div className={styles.line} />

          <p className={styles.description}>
            Carinhosamente apelidada por seus hóspedes, a Villa do Comendador é
            aquele tipo de lugar que conquista logo na chegada. Um verdadeiro
            refúgio em Pirenópolis, para quem quer viver dias calmos e tranquilos.
            <br /><br />
            Com charme rústico e uma simplicidade encantadora, a Villa é
            simplesmente diferente — perfeita para quem deseja desacelerar,
            respirar natureza e viver dias de pura tranquilidade no coração de
            Pirenópolis.
          </p>

          <a
            href="https://villadocomendador.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            SAIBA MAIS NO SITE
          </a>
        </div>

        {/* Imagem */}
        <div className={styles.imageWrapper}>
          <img
            src={img}
            alt="Villa do Comendador em Pirenópolis"
            className={styles.image}
          />
        </div>

      </div>
    </section>
  );
}
