/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
import styled from 'styled-components';
import AnnouncementList from '@components/LawsuitCard';
import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper/index';
import { Section } from '@components/Section';

import { Direction } from '@components/Direction';
import { Link } from '@components/Button';
import useAnnouncements from '@services/creditbook/lawsuit/hooks/useAnnouncements';
import useUserAnnouncements from '@services/creditbook/lawsuit/hooks/useUserAnnouncements';

// Container para garantir que a seção abrace o carrossel sem cortar os botões na base
const SwiperSectionWrapper = styled.div`
  width: 100%;
  padding-bottom: 24px; /* Garante respiro extra para os botões não vazarem */
  
  .swiper {
    padding: 12px 8px 24px 8px !important; /* Espaçamento interno do Swiper */
    overflow: visible; /* Permite visualizar sombras e botões sem cortar */
  }

  .swiper-slide {
    height: auto; /* Mantém os cards alinhados em altura */
    display: flex;
    justify-content: center;
  }
`;

export default function Home() {
  const response = useUserAnnouncements();

  const { announcements: announcementsPremium, isLoading: isLoadingPremium } =
    useAnnouncements(undefined, {
      params: {},
      getOnlyPremium: true,
    });

  const isPremiumAnnouncementsAvailable =
    !isLoadingPremium &&
    announcementsPremium &&
    announcementsPremium?.results?.length > 0;

  const { announcements: favoriteAnnouncements, isLoading: isLoadingFavorite } =
    useAnnouncements(undefined, { params: { isFavorite: true } });

  const isFavoriteAnnouncementsAvailable =
    !isLoadingFavorite &&
    favoriteAnnouncements &&
    favoriteAnnouncements?.results?.length > 0;

  return (
    <>
      {isPremiumAnnouncementsAvailable && (
        <Section.Container bg="light" style={{ overflow: 'hidden' }}>
          <Section.Header>
            <Direction direction="horizontal" alignItems="center">
              <Section.Title as="h3">Galeria Premium</Section.Title>
              <Link legacyBehavior href="/in/gallery-premium" variant="dark">
                Ver Todos
              </Link>
            </Direction>
          </Section.Header>
          <SwiperSectionWrapper>
            <LawsuitCardSwiper lawsuits={announcementsPremium.results} />
          </SwiperSectionWrapper>
        </Section.Container>
      )}

      {isFavoriteAnnouncementsAvailable && (
        <Section.Container bg="light" style={{ marginTop: 32, overflow: 'hidden' }}>
          <Section.Header>
            <Direction direction="horizontal" alignItems="center">
              <Section.Title as="h3">Favoritos</Section.Title>
              <Link legacyBehavior href="/in/my-favorites" variant="dark">
                Ver Todos
              </Link>
            </Direction>
          </Section.Header>
          <SwiperSectionWrapper>
            <LawsuitCardSwiper lawsuits={favoriteAnnouncements.results} />
          </SwiperSectionWrapper>
        </Section.Container>
      )}

      <Section.Container style={{ marginTop: 32 }}>
        <Section.Header>
          <Section.Title as="h3">Anúncios Gerais</Section.Title>
        </Section.Header>

        <AnnouncementList
          {...response}
          notFoundProps={{
            type: 'link',
            href: '/in/ads/new',
            labelButton: 'Cadastrar Agora',
            title: 'Não há anúncios criados',
          }}
        />
      </Section.Container>
    </>
  );
<<<<<<< HEAD
}
=======
}

>>>>>>> b7d3b73 (ajustes)
