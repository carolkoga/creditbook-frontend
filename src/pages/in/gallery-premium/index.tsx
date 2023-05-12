import { AnnouncementsFilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer/Announcements';
import LawsuitCardList from '@components/LawsuitCard';

import { Section } from '@components/Section';
import useAnnouncements from '@services/creditbook/lawsuit/hooks/useAnnouncements';

export default function GalleryPremium() {
  const response = useAnnouncements(undefined, { params: { isPremium: true } });

  function handleProcessAnnouncementsFiltered(lawsuit: ResponseFilterCreditsProps<'announcements'>) {
    response.mutate(lawsuit as never);
    if (lawsuit.results.length <= 0) {
      response.mutateIsFiltered(false);
    }
    response.mutateIsFiltered(true);
  }

  return (
    <>
      <Section.Header>
        <Section.Title as="h1">
          {!response?.isFiltered && 'Galeria Premium'}
          {response?.isFiltered && 'Anúncios relacionados ao filtro'}
        </Section.Title>
        <AnnouncementsFilterDrawer
          onGetResponseResults={handleProcessAnnouncementsFiltered}
          customQuery={{ isPremium: true }}
        />
      </Section.Header>

      <Section.Container>
        <LawsuitCardList {...response} />
      </Section.Container>
    </>
  );
}
