import { useRef } from 'react';

import LawsuitCardList, { LawsuitListRefParams } from '@components/LawsuitCard';
import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper/index';
import { Section } from '@components/Section';

import { Direction } from '@components/Direction';
import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import { Link } from '@components/Button';
import useListAnnouncements from '@services/creditbook/lawsuit/hooks/useListAnnouncements';

export default function Home() {
  const { announcements } = useListAnnouncements('get_all_announcements');
  const { announcements: announcementsPremium } = useListAnnouncements('get_all_announcements_premium', { params: { isPremium: true } });
  const lawsuitListRef = useRef<LawsuitListRefParams>({} as LawsuitListRefParams);
  const { isFiltered } = lawsuitListRef.current;

  function handleProcessAnnouncementsFiltered(lawsuit: ResponseFilterCreditsProps<'announcements'>) {
    lawsuitListRef.current.handleSetLawsuits(lawsuit?.results);
    lawsuitListRef.current.handleSetPagination({
      total: lawsuit?.pages,
    });
    lawsuitListRef.current.handleIsFiltered(true);
  }
  return (
    <>
      {announcementsPremium.results && (
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
            {!isFiltered && 'Anúncios Gerais'}
            {isFiltered && 'Anúncios relacionados ao filtro'}
          </Section.Title>
          <FilterDrawer onGetResponseResults={handleProcessAnnouncementsFiltered} />
        </Section.Header>

        {announcements?.results && (
          <LawsuitCardList
            ref={lawsuitListRef}
            lawsuits={announcements?.results}
            pagination={{ total: announcements?.pages }}
          />
        )}

      </Section.Container>
    </>
  );
}
