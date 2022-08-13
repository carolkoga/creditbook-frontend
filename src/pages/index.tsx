import Link from 'next/link';
import Image from 'next/image';
import {
  ContainerVideoAndInfo,
  ContentHero,
  Direction,
  HeaderSection,
  InfoCard,
  Section,
  SectionHero,
  SubTitleSection,
  TitleSection,
  WrapperImageHero,
  WrapperInfoCard,
} from 'app/assets/styles/pages/home';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import { Actions } from '@components/ActionLink';
import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper';

import { lawsuitsMock } from '@mocks/suits';
import { Button } from '@components/Button/styled';
import { WrapperVideo } from '@components/WrapperVideo';

export default function Home() {
  return (
    <>
      <SectionHero>
        <ContentHero>
          <h1>
            <strong>CreditBook.</strong>
            A revolução do jeito de negociar créditos, ações e direitos judiciais.
          </h1>
          <h2>
            Precisando de dinheiro? Procurando uma forma lucrativa para investir?
            Chegou a plataforma definitiva para negociar créditos, ações e direitos judiciais.
            É simples, rápido e seguro.
          </h2>

          <Actions>
            <Link href="/login">
              <a>
                Anuncie
              </a>
            </Link>
            <Link href="/login">
              <a>
                Compre
              </a>
            </Link>
          </Actions>
        </ContentHero>

        <WrapperImageHero>
          <Image
            src="/assets/images/hero.png"
            layout="fill"
            priority
            alt="Hero"
          />
        </WrapperImageHero>
      </SectionHero>

      <Section>
        <HeaderSection>
          <TitleSection>Como funciona a venda e compra?</TitleSection>
          <SubTitleSection>Assista o vídeo abaixo:</SubTitleSection>
        </HeaderSection>

        <ContainerVideoAndInfo>
          <WrapperVideo>
            <LiteYouTubeEmbed id="w87t420-TWg" title="Creditbook" poster="hqdefault" />
          </WrapperVideo>

          <WrapperInfoCard>
            <InfoCard>
              <Image
                src="/assets/icons/home/list-icon.svg"
                width="85px"
                height="85px"
                alt="De Lista"
                layout="fixed"
              />
              <span>Anuncie</span>
            </InfoCard>

            <InfoCard>
              <div className="wrapper__image">
                <Image
                  src="/assets/icons/home/insight.svg"
                  width="85px"
                  height="85px"
                  alt="De insight"
                  layout="fixed"
                />
              </div>
              <span>
                Avalie as ofertas
              </span>
            </InfoCard>

            <InfoCard>
              <div className="wrapper__image">
                <Image
                  src="/assets/icons/home/hand-money.svg"
                  width="85px"
                  height="85px"
                  alt="De uma bolsa de dinheiro flutuando na mão (ilustrativa)"
                  layout="fixed"
                />
              </div>
              <span>
                Receba o valor
              </span>
            </InfoCard>

            <InfoCard>
              <div className="wrapper__image">
                <Image
                  src="/assets/icons/home/dollar-icon.svg"
                  width="85px"
                  height="85px"
                  alt="De Sinal de dolar"
                  layout="fixed"
                />
              </div>
              <span>
                Busque a melhor oferta
              </span>
            </InfoCard>

            <InfoCard>
              <div className="wrapper__image">
                <Image
                  src="/assets/icons/home/money-bag.svg"
                  width="85px"
                  height="85px"
                  alt="Bolsa de dinheiro"
                  layout="fixed"
                />
              </div>
              <span>
                Faça uma oferta
              </span>
            </InfoCard>

            <InfoCard>
              <div className="wrapper__image">
                <Image
                  src="/assets/icons/home/partner.svg"
                  width="85px"
                  height="85px"
                  alt="Duas mãos fechando acordo"
                  layout="fixed"
                />
              </div>
              <span>
                Compre crédito
              </span>
            </InfoCard>
          </WrapperInfoCard>
        </ContainerVideoAndInfo>
      </Section>

      <Section>
        <HeaderSection>
          <Direction>
            <TitleSection>Galeria Premium</TitleSection>
            <Link href="/galeria-premium">
              <Button as="a" size="small">
                Ver Todos
              </Button>
            </Link>
          </Direction>
        </HeaderSection>
        <LawsuitCardSwiper lawsuits={lawsuitsMock} access="not logged" />
      </Section>
    </>
  );
}
