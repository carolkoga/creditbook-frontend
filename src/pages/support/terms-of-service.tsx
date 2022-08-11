import Navigation from '@components/pages/support/navigation';
import { Section } from '@styles/pages/home';

export default function TermsOfService() {
  return (
    <main>
      <Navigation />
      <Section>
        <div className="ant-typography sc-hAcGzb fJJSql">
          Sejam bem-vindos! É um prazer tê-los conosco. Agradecemos por dedicarem seu tempo
          para a leitura deste contrato ora denominado “TERMOS E CONDIÇÕES GERAIS DE USO
          CREDITBOOK”, doravante simplesmente “TCGU”.
          <span className="ant-typography">
            <strong>
              <u>ATENÇÃO:</u>
              {' '}
              leia atenta e cuidadosamente este TCGU, pois este contém
              informações importantes sobre seus direitos e obrigações.
            </strong>
          </span>
          A compra de créditos judiciais é um negócio que pode proporcionar lucros,
          mas também pode envolver riscos financeiros. Caberá exclusivamente ao
          comprador analisar tais riscos, conforme as particularidades do crédito anunciado.

        </div>
      </Section>
    </main>
  );
}
