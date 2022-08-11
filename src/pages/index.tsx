/* eslint-disable jsx-a11y/media-has-caption */
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
import { Actions } from '@components/ActionLink';
import { useState } from 'react';
import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper';

import { lawsuitsMock } from '@mocks/suits';
import { Button } from '@components/Button/styled';
import { WrapperVideo } from '@components/WrapperVideo';

export default function Home() {
  const [controlsIsActive, setControlsIsActive] = useState(false);

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
          <TitleSection>Como Funciona?</TitleSection>
          <SubTitleSection>Assiste o vídeo abaixo:</SubTitleSection>
        </HeaderSection>

        <ContainerVideoAndInfo>
          <WrapperVideo>
            <video
              poster="/assets/images/video-thumbnail.png"
              width="100%"
              height="100%"
              controls={controlsIsActive}
              onClick={() => setControlsIsActive(true)}
              style={!controlsIsActive ? { cursor: 'pointer' } : { cursor: 'none' }}
            >
              <source
                src="https://creditbook.com.br/videos/CreditBook_v3.mp4"
                type="video/mp4"
              />
            </video>
          </WrapperVideo>

          <WrapperInfoCard>
            <InfoCard>
              <Image src="/assets/icons/home/list-icon.svg" width="85px" height="85px" alt="De Lista" />
              Anuncie
            </InfoCard>

            <InfoCard>
              <Image src="/assets/icons/home/insight.svg" width="85px" height="85px" alt="De insight" />
              <span>
                Avalie Ofertas
              </span>
            </InfoCard>

            <InfoCard>
              <Image src="/assets/icons/home/dollar-icon.svg" width="85px" height="85px" alt="De Sinal de dolar" />
              <span>
                Busque a melhor oferta
              </span>
            </InfoCard>

            <InfoCard>
              <Image src="/assets/icons/home/hand-money.svg" width="85px" height="85px" alt="De uma bolsa de dinheiro flutuando na mão (ilustrativa)" />
              <span>
                Receba o valor
              </span>
            </InfoCard>

            <InfoCard>
              <Image src="/assets/icons/home/money-bag.svg" width="85px" height="85px" alt="Bolsa de dinheiro" />
              <span>
                Faça uma oferta
              </span>
            </InfoCard>

            <InfoCard>
              <Image src="/assets/icons/home/partner.svg" width="85px" height="85px" alt="Duas mãos fechando acordo" />
              <span>
                Compre Crédito
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
