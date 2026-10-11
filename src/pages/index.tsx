/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import NextLink from 'next/link';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import {
  SectionHero,
  ContentHero,
  WrapperImageHero,
  WrapperInfoCard,
  InfoCard,
  ContainerVideoAndInfo,
  RelativeImageWrapper,
  PreSignupWrapper,
  LineInfoCards,
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
  const announcementsAsPremium = useAnnouncements(undefined, {
    getOnlyPremium: true,
    params: {},
  });
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      <SectionHero single={isAuthenticated}>
        <ContentHero single={isAuthenticated}>
          <RelativeImageWrapper>
            <WrapperImageHero>
              <Image
                src="/assets/images/home/creditbook_banner_texto.png"
                width={580}
                height={320}
                priority
                alt="Hero"
              />
            </WrapperImageHero>
          </RelativeImageWrapper>

          <Actions className="actions">
            <NextLink legacyBehavior href="/in/ads/new?redirect=/in/ads/new">
              <img
                src="/assets/images/home/creditbook_banner_botão1.png"
                alt="comprar"
              />
            </NextLink>
            <NextLink
              legacyBehavior
              href="/in/buy-credits?redirect=/in/buy-credits"
            >
              <img
                src="/assets/images/home/creditbook_banner_botão2.png"
                alt="vender"
              />
            </NextLink>
          </Actions>
        </ContentHero>

        <PreSignupWrapper isVisible={!isAuthenticated}>
          <PreSignUp isVisible={!isAuthenticated} />
        </PreSignupWrapper>
      </SectionHero>

      <Section.Container>
        <Section.Header>
          <Section.Title>Como funciona a venda e compra?</Section.Title>
          <Section.Subtitle>
            Assista abaixo como funciona a venda e compra:
          </Section.Subtitle>
        </Section.Header>

        <ContainerVideoAndInfo>
          <WrapperVideo>
            <LiteYouTubeEmbed
              id="w87t420-TWg"
              title="Creditbook"
              poster="hqdefault"
            />
          </WrapperVideo>

          <LineInfoCards>
            {/* --- BLOCO: VENDA DE CRÉDITOS --- */}
            <h3>Venda de Créditos</h3>
            <WrapperInfoCard>
              <InfoCard>
                <div className="wrapper__image">
                  <NextLink
                    legacyBehavior
                    href="/in/support/sell-ads?redirect=/in/support/sell-ads"
                  >
                    <Image
                      src="/assets/icons/home/creditbook_icone_anuncie.svg"
                      width={25}
                      height={25}
                      alt="Anuncie seu crédito"
                      layout="fixed"
                    />
                  </NextLink>
                </div>
                <span>Anuncie seu crédito judicial em qualquer fase da ação</span>
              </InfoCard>

              <InfoCard>
                <div className="wrapper__image">
                  <NextLink
                    legacyBehavior
                    href="/in/support/sell-ads?redirect=/in/support/sell-ads"
                  >
                    <Image
                      src="/assets/icons/home/creditbook_icone_avalie.svg"
                      width={25}
                      height={25}
                      alt="Avalie ofertas"
                      layout="fixed"
                    />
                  </NextLink>
                </div>
                <span>Avalie ofertas e escolha a melhor para você</span>
              </InfoCard>

              <InfoCard>
                <div className="wrapper__image">
                  <NextLink
                    legacyBehavior
                    href="/in/support/sell-ads?redirect=/in/support/sell-ads"
                  >
                    <Image
                      src="/assets/icons/home/creditbook_icone_receba.svg"
                      width={25}
                      height={25}
                      alt="Receba em dinheiro"
                      layout="fixed"
                    />
                  </NextLink>
                </div>
                <span>Chega de esperar! Receba o valor em dinheiro</span>
              </InfoCard>
            </WrapperInfoCard>

            {/* --- BLOCO: COMPRA DE CRÉDITOS --- */}
            <h3>Compra de Créditos</h3>
            <WrapperInfoCard>
              <InfoCard>
                <div className="wrapper__image">
                  <NextLink
                    legacyBehavior
                    href="/in/ads/ads?redirect=/in/ads/ads"
                  >
                    <Image
                      src="/assets/icons/home/creditbook_icone_busque.svg"
                      width={25}
                      height={25}
                      alt="Busque anúncios"
                      layout="fixed"
                    />
                  </NextLink>
                </div>
                <span>Busque anúncios com filtros inteligentes</span>
              </InfoCard>

              <InfoCard>
                <div className="wrapper__image">
                  <NextLink
                    legacyBehavior
                    href="/in/ads/ads?redirect=/in/ads/ads"
                  >
                    <Image
                      src="/assets/icons/home/creditbook_icone_oferta.svg"
                      width={25}
                      height={25}
                      alt="Escolha o investimento"
                      layout="fixed"
                    />
                  </NextLink>
                </div>
                <span>Escolha o melhor investimento e faça sua oferta</span>
              </InfoCard>

              <InfoCard>
                <div className="wrapper__image">
                  <NextLink
                    legacyBehavior
                    href="/in/ads/ads?redirect=/in/ads/ads"
                  >
                    <Image
                      src="/assets/icons/home/creditbook_icone_compre.svg"
                      width={25}
                      height={25}
                      alt="Feche negócio"
                      layout="fixed"
                    />
                  </NextLink>
                </div>
                <span>
                  Feche negócio
                  <br /> com alta lucratividade
                </span>
              </InfoCard>
            </WrapperInfoCard>
          </LineInfoCards>
        </ContainerVideoAndInfo>
      </Section.Container>

      {announcementsAsPremium?.announcements?.results?.length > 0 && (
        <Section.Container>
          <Section.Header>
            <Direction direction="horizontal" alignItems="center">
              <Section.Title as="h3">Galeria Premium</Section.Title>
              <Link legacyBehavior href="/ain/gallery-premium" variant="dark">
                Ver Todos
              </Link>
            </Direction>
          </Section.Header>
          <LawsuitCardSwiper
            lawsuits={announcementsAsPremium?.announcements?.results.filter(
              ({ userId }) => userId !== user?.id
            )}
          />
        </Section.Container>
      )}
    </>
  );
}