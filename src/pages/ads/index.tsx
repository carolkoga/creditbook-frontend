import AnnouncementList from '@components/LawsuitCard';

import { Section } from '@components/Section';
import TabBatchAnnouncement from '@components/TabBatchAnnouncement';
import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import useAnnouncements from '@services/creditbook/lawsuit/hooks/useAnnouncements';

export default function SingleLawsuits() {
  const response = useAnnouncements(undefined, {
    params: {
      orderBy: {
        isPremium: true,
      },
    },
  });

  function handleProcessAnnouncementsFiltered(lawsuit: ResponseFilterCreditsProps<'announcements'>) {
    response.mutate(lawsuit as never);
    if (lawsuit.results.length <= 0) {
      response.mutateIsFiltered(false);
    }
    response.mutateIsFiltered(true);
  }

  return (
    <TabBatchAnnouncement batchLink="/batches" announcementLink="/ads">
      <Section.Header>
        <Section.Title as="h1">
          {!response.isFiltered && 'Anúncios Individuais'}
          {response.isFiltered && 'Anúncios relacionados ao filtro'}
        </Section.Title>
        <FilterDrawer onGetResponseResults={handleProcessAnnouncementsFiltered} />
      </Section.Header>

      <Section.Container>
        <AnnouncementList {...response} />
      </Section.Container>
    </TabBatchAnnouncement>
  );
}
