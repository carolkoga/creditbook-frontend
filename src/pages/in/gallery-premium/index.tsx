import { useRef } from 'react';

import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import LawsuitCardList, { LawsuitListRefParams } from '@components/LawsuitCard';

import { Section } from '@components/Section';
import useListAnnouncements from '@services/creditbook/lawsuit/hooks/useListAnnouncements';

export default function GalleryPremium() {
  const { announcements } = useListAnnouncements('announcements_premium', { params: { isPremium: true } });
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
      <Section.Header>
        <Section.Title as="h1">
          {!isFiltered && 'Galeria Premium'}
          {isFiltered && 'Anúncios relacionados ao filtro'}
        </Section.Title>
        <FilterDrawer onGetResponseResults={handleProcessAnnouncementsFiltered} />
      </Section.Header>

      <Section.Container>
        {announcements.results && (
          <LawsuitCardList
            ref={lawsuitListRef}
            lawsuits={announcements.results}
            pagination={{ total: announcements.pages }}
            customQuery={{ isPremium: true }}
          />
        )}
      </Section.Container>
    </>
  );
}
