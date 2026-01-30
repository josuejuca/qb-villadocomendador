import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";

import img from "../../assets/img/photos/01.webp";
import img2 from "../../assets/img/photos/02.webp";
import img3 from "../../assets/img/photos/03.webp";
import img4 from "../../assets/img/photos/04.webp";
import img5 from "../../assets/img/photos/05.webp";
import img6 from "../../assets/img/photos/06.webp";
import img7 from "../../assets/img/photos/07.webp";
import img8 from "../../assets/img/photos/08.webp";
// import img9 from "../../assets/img/photos/09.webp";
// import img10 from "../../assets/img/photos/10.webp";

type GalleryItem = {
  src: string;
  alt: string;
};

export function GalleryVilla() {
  // Troque pelas suas imagens (caminhos locais ou URLs)
  const images: GalleryItem[] = useMemo(
    () => [
      { src: img, alt: "Área da piscina" },
      { src: img2, alt: "Piscina e natureza" },
      { src: img3, alt: "Espaço de descanso" },
      { src: img4, alt: "Vista aérea da piscina" },
      { src: img5, alt: "Jardins e palmeiras" },
      { src: img6, alt: "Área externa" },
      { src: img7, alt: "Ambiente interno" },
      { src: img8, alt: "Natureza ao redor" },
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  function openAt(index: number) {
    setActiveIndex(index);
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
  }

  function close() {
    setOpen(false);
    document.documentElement.style.overflow = "";
  }

  function next() {
    setActiveIndex((i) => (i + 1) % images.length);
  }

  function prev() {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!open) return;

      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, images.length]);

  return (
    <section className={styles.sectionGallery}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Galeria da Villa</h2>
            <p className={styles.subtitle}>Encante-se com os detalhes.</p>
            <div className={styles.line} />
          </div>

          <a
            className={styles.button}
            href="https://villadocomendador.com.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            VER MAIS
          </a>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {images.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              className={styles.card}
              onClick={() => openAt(idx)}
              aria-label={`Abrir imagem: ${img.alt}`}
            >
              <img className={styles.image} src={img.src} alt={img.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div className={styles.lightbox} role="dialog" aria-modal="true">
          <button className={styles.backdrop} onClick={close} aria-label="Fechar" />

          <div className={styles.modal}>
            <div className={styles.modalTop}>
              <span className={styles.counter}>
                {activeIndex + 1}/{images.length}
              </span>

              <button className={styles.iconBtn} onClick={close} aria-label="Fechar">
                ✕
              </button>
            </div>

            <button className={`${styles.nav} ${styles.left}`} onClick={prev} aria-label="Anterior">
              ‹
            </button>

            <img
              className={styles.modalImage}
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
            />

            <button className={`${styles.nav} ${styles.right}`} onClick={next} aria-label="Próxima">
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
