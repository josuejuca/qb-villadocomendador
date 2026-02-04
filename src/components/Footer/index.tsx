import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          {/* Logo */}
          <div className={styles.brand}>
            <img src="/quadraimob.svg" alt="quadraimob Logo" />            
          </div>

          {/* Links */}
          <div className={styles.links}>
            <div>
              <h4>Institucional</h4>
              <a href="https://quadraimob.com.br/sobre-a-quadraimob/" target="_blank">Sobre nós</a>
              <a href="https://quadraimob.com.br/codigo-de-etica-e-conduta/" target="_blank">Código de Ética</a>
              {/* <a href="https://blog.quadraimob.com.br/" target="_blank">Blog</a>          */}
              <a href="https://quadraimob.com.br/fale-com-a-quadraimob/" target="_blank">Contato</a>
            </div>
            

            <div>
              <h4>Legal</h4>
              <a href="#">Regulamento da campanha</a>
              <a href="#">Política de Privacidade</a>
              <a href="#">LGPD</a>
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
