import styles from "./styles.module.css";

export function Header() {

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <img src="/quadraimob.svg" alt="quadraimob Logo" />
        </div>

        <div className={styles.logovilla}>
          <img src="/villa-do-comendador.png" alt="quadraimob Logo" />
        </div>
      </div>
    </header>
  );
}