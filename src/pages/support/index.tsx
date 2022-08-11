import Navigation from '@components/pages/support/navigation';
import { Section } from '@styles/pages/home';

export default function FAQ() {
  return (
    <main>
      <Navigation />
      <Section>
        <details>
          <summary>Creditbook</summary>
          <ul>
            <li>
              <details>
                <summary>O que é o CreditBook?</summary>
                <p>
                  CreditBook é uma plataforma digital desenvolvida para ser uma vitrine de créditos
                  judiciais, proporcionando àqueles que possuem ações na justiça venderem seus
                  direitos creditórios a investidores e demais interessados. Acertado o preço
                  com o comprador, o CreditBook providencia o contrato de cessão de direitos e
                  viabiliza a assinatura digital das partes, conferindo total segurança e
                  validade jurídica ao negócio.
                </p>
              </details>
            </li>
          </ul>
        </details>
      </Section>
    </main>
  );
}
