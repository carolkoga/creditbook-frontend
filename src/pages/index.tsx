import Image from 'next/image';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import {
  SectionHero,
  ContentHero,
  WrapperImageHero,
  WrapperInfoCard,
  InfoCard,
  ContainerVideoAndInfo,
  RelativeImageWrapper,
} from '@styles/pages/home';

import { Section } from '@components/Section';
import { Actions } from '@components/ActionLink';
import { Link } from '@components/Button';
import { WrapperVideo } from '@components/WrapperVideo';

import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper';
import { Direction } from '@components/Direction';
import useAnnouncements from '@services/creditbook/lawsuit/hooks/useAnnouncements';
import useAuth from '@hooks/useAuth';
import { PreSignUp } from '@components/pages/home/PreSignUp';

export default function HomeLadingPage() {
  const announcementsAsPremium = useAnnouncements(undefined, { getOnlyPremium: true, params: {} });
  const { isAuthenticated } = useAuth();

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
            <Link legacyBehavior href="/in/ads/new">
              Vender
            </Link>
            <Link legacyBehavior href="/in/buy-credits" variant="secondary">
              Comprar
            </Link>
          </Actions>
        </ContentHero>

        <RelativeImageWrapper>
          <WrapperImageHero>
            <Image
              src="/assets/images/hero.png"
              layout="fixed"
              width="527"
              height="430"
              priority
              alt="Hero"
            />
          </WrapperImageHero>

          <PreSignUp isVisible={!isAuthenticated} />
        </RelativeImageWrapper>

      </SectionHero>

      <Section.Container>
        <Section.Header>
          <Section.Title>Como funciona a venda e compra?</Section.Title>
          <Section.Subtitle>Assista abaixo como funciona a venda e compra:</Section.Subtitle>
        </Section.Header>

        <ContainerVideoAndInfo>
          <WrapperVideo>
            <LiteYouTubeEmbed id="w87t420-TWg" title="Creditbook" poster="hqdefault" />
          </WrapperVideo>

          <WrapperInfoCard>
            <InfoCard>
              <Image
                src="/assets/icons/home/list-icon.svg"
                width="85"
                height="85"
                alt="De Lista"
                layout="fixed"
              />
              <span>Anuncie</span>
            </InfoCard>

            <InfoCard>
              <div className="wrapper__image">
                <Image
                  src="/assets/icons/home/insight.png"
                  width="85"
                  height="85"
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
                  width="85"
                  height="85"
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
                  width="85"
                  height="85"
                  alt="De Sinal de dolar"
                  layout="fixed"
                />
              </div>
              <span>
                Busque anúncios
              </span>
            </InfoCard>

            <InfoCard>
              <div className="wrapper__image">
                <Image
                  src="/assets/icons/home/money-bag.png"
                  width="85"
                  height="85"
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
                  src="/assets/icons/home/partner.png"
                  width="85"
                  height="85"
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
      </Section.Container>

      {announcementsAsPremium?.announcements?.results?.length > 0 && (
        <Section.Container>
          <Section.Header>
            <Direction direction="horizontal" alignItems="center">
              <Section.Title as="h3">Galeria Premium</Section.Title>
              <Link legacyBehavior href="/in/gallery-premium" variant="dark">
                Ver Todos
              </Link>
            </Direction>
          </Section.Header>
          <LawsuitCardSwiper lawsuits={announcementsAsPremium?.announcements?.results} />
        </Section.Container>
      )}
    </>
  );
}
