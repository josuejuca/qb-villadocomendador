import { Link } from 'react-router-dom'
import styles from "./styles.module.css";

export function Footer() {
  return (
      <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          {/* Logo */}
          <div className={styles.brand}>
            <Link to="/">
              <img src="/quadraimob.svg" alt="quadraimob Logo" />
            </Link>
          </div>

          {/* Links */}
          <div className={styles.links}>
            <div>
              <h4>Institucional</h4>
              <a
                href="https://quadraimob.com.br/sobre-a-quadraimob/"
                target="_blank"
                rel="noreferrer"
              >
                Sobre nós
              </a>
              <a
                href="https://quadraimob.com.br/codigo-de-etica-e-conduta/"
                target="_blank"
                rel="noreferrer"
              >
                Código de Ética
              </a>
              {/* <a href="https://blog.quadraimob.com.br/" target="_blank">Blog</a>          */}
              <a
                href="https://quadraimob.com.br/fale-com-a-quadraimob/"
                target="_blank"
                rel="noreferrer"
              >
                Contato
              </a>
            </div>
            <div>
              <h4>Legal</h4>
              <Link to="/regulamento">Regulamento da campanha</Link>
              <Link to="/lgpd">LGPD</Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          © {new Date().getFullYear()} quadraimob. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
