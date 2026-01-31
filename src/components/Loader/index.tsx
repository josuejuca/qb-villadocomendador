import styles from "./styles.module.css";

type LoaderProps = {
  label?: string;
};

export function Loader({ label = " " }: LoaderProps) {
  return (
    <div className={styles.backdrop} role="status" aria-live="polite">
      <div className={styles.card}>
        <div className={styles.spinner} aria-hidden="true" />
        <p className={styles.label}>{label}</p>
      </div>
    </div>
  );
}
