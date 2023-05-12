import { AnnouncementsFilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer/Announcements';
import AnnouncementList from '@components/LawsuitCard';

import { Section } from '@components/Section';
import TabBatchAnnouncement from '@components/TabBatchAnnouncement';

import useAnnouncements from '@services/creditbook/lawsuit/hooks/useAnnouncements';

export default function BuyAnnouncements() {
  const response = useAnnouncements();

  function handleProcessAnnouncementsFiltered(lawsuit: ResponseFilterCreditsProps<'announcements'>) {
    response.mutate(lawsuit as never);
    if (lawsuit.results.length <= 0) {
      response.mutateIsFiltered(false);
    }
    response.mutateIsFiltered(true);
  }

  return (
    <TabBatchAnnouncement announcementLink="/in/buy-credits" batchLink="/in/buy-credits/batches">
      <Section.Header>
        <Section.Title as="h1">
          {!response.isFiltered && 'Comprar anúncios'}
          {response.isFiltered && 'Anúncios relacionados ao filtro'}
        </Section.Title>
        <AnnouncementsFilterDrawer onGetResponseResults={handleProcessAnnouncementsFiltered} />
      </Section.Header>

      <Section.Container>
        <AnnouncementList {...response} />
      </Section.Container>
    </TabBatchAnnouncement>
  );
}
