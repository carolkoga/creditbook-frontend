import AnnouncementList from '@components/LawsuitCard';
import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper/index';
import { Section } from '@components/Section';

import { Direction } from '@components/Direction';
import { Link } from '@components/Button';
import useAnnouncements from '@services/creditbook/lawsuit/hooks/useAnnouncements';
import useUserAnnouncements from '@services/creditbook/lawsuit/hooks/useUserAnnouncements';

export default function Home() {
  const response = useUserAnnouncements();
  const {
    announcements: announcementsPremium,
    isLoading: isLoadingPremium,
  } = useAnnouncements(undefined, { params: { isPremium: true } });

  const isPremiumAnnouncementsAvailable = (
    !isLoadingPremium
    && announcementsPremium
    && announcementsPremium?.results?.length > 0
  );

  const {
    announcements: favoriteAnnouncements,
    isLoading: isLoadingFavorite,
  } = useAnnouncements(undefined, { params: { isFavorite: true } });

  const isFavoriteAnnouncementsAvailable = (
    !isLoadingFavorite
    && favoriteAnnouncements
    && favoriteAnnouncements?.results?.length > 0
  );

  return (
    <>
      {isPremiumAnnouncementsAvailable && (
        <Section.Container bg="light">
          <Section.Header>
            <Direction direction="horizontal" alignItems="center">
              <Section.Title as="h3">Galeria Premium</Section.Title>
              <Link href="/in/gallery-premium" variant="dark">
                Ver Todos
              </Link>
            </Direction>
          </Section.Header>
          <LawsuitCardSwiper lawsuits={announcementsPremium.results} />
        </Section.Container>
      )}

      {isFavoriteAnnouncementsAvailable && (
        <Section.Container bg="light" style={{ marginTop: 32 }}>
          <Section.Header>
            <Direction direction="horizontal" alignItems="center">
              <Section.Title as="h3">Favoritos</Section.Title>
              <Link href="/in/my-favorites" variant="dark">
                Ver Todos
              </Link>
            </Direction>
          </Section.Header>
          <LawsuitCardSwiper lawsuits={favoriteAnnouncements.results} />
        </Section.Container>
      )}

      <Section.Container style={{ marginTop: 32 }}>
        <Section.Header>
          <Section.Title as="h3">
            Anúncios Gerais
          </Section.Title>
        </Section.Header>

        <AnnouncementList
          {...response}
          notFoundProps={{
            type: 'link',
            href: '/in/ads/new',
            labelButton: 'Cadastrar Agora',
            title: 'Não há anúncio favoritado ou criado',
          }}
        />
      </Section.Container>
    </>
  );
}
