import { useRef } from 'react';

import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import LawsuitCardList, { LawsuitListRefParams } from '@components/LawsuitCard';

import { Section } from '@components/Section';
import useAnnouncements from '@services/creditbook/lawsuit/hooks/useAnnouncements';

export default function GalleryPremium() {
  const { announcements, isLoading } = useAnnouncements('announcements_premium', { params: { isPremium: true } });
  const lawsuitListRef = useRef<LawsuitListRefParams>({} as LawsuitListRefParams);

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
          {!lawsuitListRef?.current?.isFiltered && 'Galeria Premium'}
          {lawsuitListRef?.current?.isFiltered && 'Anúncios relacionados ao filtro'}
        </Section.Title>
        <FilterDrawer onGetResponseResults={handleProcessAnnouncementsFiltered} />
      </Section.Header>

      <Section.Container>
        {!isLoading && (
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
