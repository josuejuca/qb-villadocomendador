import styles from "./styles.module.css";

export function Faq() {
  return (
    <section className={styles.sectionGallery}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>FAQ</h2>
            <p className={styles.subtitle}>Perguntas frequentes</p>
            <div className={styles.line} />
          </div>
        </div>

        {/* <p className={styles.intro}>
          <strong>POLÍTICA DE HOSPEDAGEM, ALTERAÇÃO E CANCELAMENTO</strong>
          <br />
          Todas as solicitações referentes a reservas, alterações, cancelamentos e demais informações devem
          ser enviadas exclusivamente para o e-mail:{" "}
          <a className={styles.link} href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p> */}

        <div className={styles.faq}>
          <details className={styles.item}>
            <summary className={styles.question}>O que é essa promoção?</summary>
            <div className={styles.answer}>
              <p>
               É um sorteio promocional realizado pela Quadraimob Soluções Imobiliárias Ltda., exclusivo para clientes que adquiriram imóveis com a empresa e responderam à pesquisa de satisfação dentro do período estabelecido.
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>Qual é o prêmio?</summary>
            <div className={styles.answer}>
              <p>
                O prêmio é 1 hospedagem com 2 diárias para casal, em baixa temporada, na Suíte Conforto Standard da Villa do Comendador, em Pirenópolis/GO.
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>Quem pode participar do sorteio?</summary>
            <div className={styles.answer}>
              <p>
                Podem participar clientes que:
              </p>
              
              <ul className={styles.list}>
                <li>
                 Tenham comprado um imóvel com a quadraimob entre 01 de janeiro e 31 de março de 2026;
                </li>
                <li>
                  Tenham concluído o contrato de compra e venda (com assinatura válida);
                </li>
                <li>
                  Sejam os responsáveis pela compra do imóvel;
                </li>
                <li>
                  Tenham respondido à pesquisa de satisfação;
                </li>
                <li>
                  Estejam com os dados cadastrais atualizados.
                </li>
              </ul>
            </div>
          </details>
          <details className={styles.item}>
            <summary className={styles.question}>Quem não pode participar?</summary>
            <div className={styles.answer}>
              <p>
                Não podem participar:
              </p>
              
              <ul className={styles.list}>
                <li>
                 Pessoas que não sejam responsáveis diretas pela compra;
                </li>
                <li>
                  Terceiros ou representantes por procuração;
                </li>
                <li>
                  Clientes que não responderam à pesquisa de satisfação;
                </li>
                <li>
                  Pessoas que não atendam integralmente às regras do regulamento;
                </li>
              </ul>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>Quantas vezes posso participar?</summary>
            <div className={styles.answer}>
              <p>
                Cada cliente pode participar apenas uma vez por unidade compradora, independentemente da quantidade de imóveis adquiridos no período.
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>Como faço para participar?</summary>
            <div className={styles.answer}>
              <p>
              Após a conclusão da compra do imóvel, o cliente receberá a pesquisa de satisfação.
              </p>
              <p>
                Depois de preenchê-la integralmente, a Quadraimob enviará um link de confirmação para participação no sorteio, com acesso ao regulamento, que deverá ser aceito.
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>Qual é o período de participação?</summary>
            <div className={styles.answer}>
              <p>
                O período válido para participação é de 01 de janeiro a 31 de março de 2026, sem possibilidade de prorrogação.
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>Quando e como será realizado o sorteio?</summary>
            <div className={styles.answer}>
              <p>
                O sorteio será realizado no dia 01 de abril de 2026, de forma online, por meio do perfil oficial da Quadraimob no Instagram.
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>O sorteio será transparente?</summary>
            <div className={styles.answer}>
              <p>Sim. O sorteio poderá ser realizado por live ou gravação em vídeo, garantindo transparência e publicidade ao processo, a critério da quadraimob.</p>
            </div>
          </details>

           <details className={styles.item}>
            <summary className={styles.question}>Como saberei se ganhei?</summary>
            <div className={styles.answer}>
              <p>
               O resultado será divulgado:
              </p>
              
              <ul className={styles.list}>
                <li>
                No perfil oficial da Quadraimob no Instagram;
                </li>
                <li>
                 E o ganhador será contatado por e-mail ou WhatsApp, usando os dados informados no momento da compra.
                </li>
              </ul>
            </div>
          </details>

<details className={styles.item}>
            <summary className={styles.question}>O prêmio pode ser transferido ou convertido em dinheiro?</summary>
            <div className={styles.answer}>
              <p>
                Não. <br /> O prêmio é pessoal e intransferível, não pode ser convertido em dinheiro, trocado ou substituído por outro benefício.
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>Como funciona o agendamento da hospedagem?</summary>
            <div className={styles.answer}>
              <p>
               As informações sobre reserva, datas disponíveis e regras de utilização serão enviadas diretamente ao ganhador após o sorteio.
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>O que não está incluso no prêmio?</summary>
            <div className={styles.answer}>
              <p>
                Quaisquer despesas não descritas no regulamento, como transporte, alimentação ou extras, são de responsabilidade exclusiva do ganhador.
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>O que acontece se alguém descumprir as regras?</summary>
            <div className={styles.answer}>
              <p>
               A quadraimob poderá desclassificar participantes que não cumprirem as regras ou que pratiquem atos irregulares ou fraudulentos.
              </p>
            </div>
          </details>

          <details className={styles.item}>
            <summary className={styles.question}>A participação implica em algum custo?</summary>
            <div className={styles.answer}>
              <p>
               Não. <br />Este sorteio tem caráter exclusivamente promocional e não exige pagamento adicional.
              </p>
            </div>
          </details>
          
          <details className={styles.item}>
            <summary className={styles.question}>Ao participar, o que estou aceitando?</summary>
            <div className={styles.answer}>
              <p>
              Ao participar, o cliente declara que leu e aceitou integralmente este regulamento.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
