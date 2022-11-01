import AnnouncementList from '@components/LawsuitCard';
import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper/index';
import { Section } from '@components/Section';

import { Direction } from '@components/Direction';
import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import { Link } from '@components/Button';
import useAnnouncements from '@services/creditbook/lawsuit/hooks/useAnnouncements';

export default function Home() {
  const response = useAnnouncements();
  const {
    announcements: announcementsPremium,
    isLoading: isLoadingPremium,
  } = useAnnouncements(undefined, { params: { isPremium: true } });

  function handleProcessAnnouncementsFiltered(lawsuit: ResponseFilterCreditsProps) {
    response.mutate(lawsuit as never);
    if (lawsuit.results.length <= 0) {
      response.mutateIsFiltered(false);
    }
    response.mutateIsFiltered(true);
  }
  return (
    <>
      {(!isLoadingPremium && announcementsPremium && announcementsPremium?.results?.length > 0) && (
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

      <Section.Container>
        <Section.Header>
          <Section.Title as="h3">
            {!response.isFiltered && 'Anúncios Gerais'}
            {response.isFiltered && 'Anúncios relacionados ao filtro'}
          </Section.Title>
          <FilterDrawer onGetResponseResults={handleProcessAnnouncementsFiltered} />
        </Section.Header>

        <AnnouncementList
          {...response}
          notFoundProps={{
            reloadPage: false,
            href: '/in/ads/new',
            labelButton: 'Cadastrar Agora',
          }}
        />
      </Section.Container>
    </>
  );
}
