import { useRef } from 'react';

import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import LawsuitCardList, { LawsuitListRefParams } from '@components/LawsuitCard';

import { Section } from '@components/Section';
import TabBatchAnnouncement from '@components/TabBatchAnnouncement';

import useAnnouncements from '@services/creditbook/lawsuit/hooks/useAnnouncements';

export default function BuyAnnouncements() {
  const { announcements, isLoading } = useAnnouncements('get_all_announcements');
  const lawsuitListRef = useRef<LawsuitListRefParams>({} as LawsuitListRefParams);

  function handleProcessAnnouncementsFiltered(lawsuit: ResponseFilterCreditsProps<'announcements'>) {
    lawsuitListRef.current.handleSetLawsuits(lawsuit?.results);
    lawsuitListRef.current.handleSetPagination({
      total: lawsuit?.pages,
    });
    lawsuitListRef.current.handleIsFiltered(true);
  }

  return (
    <TabBatchAnnouncement announcementLink="/in/buy-credits" batchLink="/in/buy-credits/batches">
      <Section.Header>
        <Section.Title as="h1">
          {!lawsuitListRef?.current?.isFiltered && 'Comprar anúncios'}
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
          />
        )}
      </Section.Container>
    </TabBatchAnnouncement>
  );
}
