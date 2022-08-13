import Image from 'next/image';

import { TextContainer } from '@styles/pages/about';
import { LayoutWithImage, WrapperImage } from '@styles/pages/support';

import {
  HeaderSection,
  TitleSection,
  Section,
} from '@styles/pages/home';
import { StructureDirection } from '@components/StructureDirection';

export default function About() {
  return (
    <StructureDirection style={{ justifyContent: 'center' }}>
      <Section>
        <HeaderSection>
          <TitleSection>Sobre Creditbook</TitleSection>
        </HeaderSection>

        <LayoutWithImage>
          <TextContainer>
            <p>
              Creditbook é uma plataforma digital criada para viabilizar, com agilidade e segurança,
              a venda e compra de créditos judiciais. É a solução inovadora e prática para aqueles
              que possuem créditos e não estão dispostos a aguardar longos períodos para receberem
              o dinheiro pretendido.
            </p>

            <p>
              Anunciando no site, o vendedor abre as portas para centenas de interessados comprarem
              imediatamente seus créditos. Os anúncios poderão ser facilmente identificados por meio
              de eficientes ferramentas de buscas, selecionando o tipo de crédito, preço, fase da
              ação, partes, localidade e muito mais.
            </p>

            <p>
              Acertado o valor de venda, o Creditbook faz o resto:
              <br />
              Cria o contrato de cessão de direitos e viabiliza a assinatura digital das partes,
              conferindo total segurança jurídica ao negócio. Para o anunciante, dinheiro na mão.
              Para o comprador, perspectiva de lucros no futuro.
            </p>

            <p>
              <strong>Isso é Creditbook: um bom negócio, porque é bom pra todos.</strong>
            </p>
          </TextContainer>

          <WrapperImage>
            <Image
              src="/assets/images/about/image_1.jpg"
              width="452px"
              height="463px"
              alt="Estatisticas"
              layout="fixed"
            />
          </WrapperImage>

        </LayoutWithImage>
      </Section>
    </StructureDirection>
  );
}
