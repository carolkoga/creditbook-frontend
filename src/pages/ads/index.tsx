import AnnouncementList from '@components/LawsuitCard';

import { Section } from '@components/Section';
import TabBatchAnnouncement from '@components/TabBatchAnnouncement';
import useAnnouncements from '@services/creditbook/lawsuit/hooks/useAnnouncements';
import { AnnouncementsFilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer/Announcements';

export default function SingleLawsuits() {
  const response = useAnnouncements(undefined, {
    params: {
      orderBy: {
        isPremium: true,
      },
      type: 'single',
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
        <AnnouncementsFilterDrawer onGetResponseResults={handleProcessAnnouncementsFiltered} />
      </Section.Header>

      <Section.Container align="center">
        <AnnouncementList {...response} notFoundProps={{ type: 'children', children: null }} />
      </Section.Container>
    </TabBatchAnnouncement>
  );
}
