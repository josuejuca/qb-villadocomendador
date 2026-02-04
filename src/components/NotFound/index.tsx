import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Página não encontrada</h2>
        <p className={styles.text}>
          Não conseguimos localizar a página que você tentou acessar.
        </p>
        <div className={styles.actions}>
          <Link className={styles.link} to="/">
            Voltar para a home
          </Link>
        </div>
      </div>
    </main>
  )
}
