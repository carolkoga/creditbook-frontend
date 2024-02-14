import WrapperSupport from '@components/pages/support/WrapperSupport';
import { TextContainer } from '@styles/pages/about';
import { Section } from '@components/Section';
import { LayoutWithImage, WrapperImage } from '@styles/pages/support';
import Image from 'next/image';

export default function SafetTips() {
  return (
    <WrapperSupport>
      <Section.Container>
        <Section.Header>
          <Section.Title>Dicas de Segurança</Section.Title>
        </Section.Header>

        <LayoutWithImage>
          <TextContainer>
            <p>
              Prezamos pela total segurança dos nossos usuários e, por isso, exigimos que todas as
              informações prestadas por eles sejam fidedignas e atualizadas, de modo a evitar
              eventuais prejuízos.
            </p>

            <p>
              Recomendamos que, ao adquirirem ou venderem qualquer direito creditório, os usuários
              verifiquem a veracidade das condições e dos dados inseridos pelo comprador/vendedor.
              O Creditbook não possui qualquer responsabilidade sobre a autenticidade destas
              informações, sendo dever das partes inseri-las com exatidão em nossa plataforma.
            </p>

            <p>
              Sugerimos aos usuários que jamais compartilhem seus dados pessoais, logins e senhas
              com estranhos, já que estes poderão inserir dados ou efetuar transações indevidas.
              O Creditbook não solicita estas informações em hipótese alguma e somente se comunica
              com os usuários por meio de suas redes oficiais.
            </p>

            <p>
              Portanto, qualquer e-mail, correspondência ou mensagem alheios deverão ser
              desconsiderados. Em caso de dúvidas, entre em contato conosco por meio dos
              nossos canais oficiais.
            </p>
          </TextContainer>

          <WrapperImage>
            <Image
              src="/assets/images/about/image_2.jpg"
              width="452"
              height="463"
              alt="Segurança"
              layout="fixed"
            />
          </WrapperImage>

        </LayoutWithImage>
      </Section.Container>
    </WrapperSupport>
  );
}
