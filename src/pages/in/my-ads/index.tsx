import AnnouncementList from '@components/LawsuitCard';

import { Section } from '@components/Section';

import useUserAnnouncements from '@services/creditbook/lawsuit/hooks/useUserAnnouncements';

export default function MyAds() {
  const response = useUserAnnouncements();

  return (
    <>
      <Section.Header>
        <Section.Title as="h1">
          Meus anúncios
        </Section.Title>
      </Section.Header>

      <Section.Container>
        <AnnouncementList {...response} />
      </Section.Container>
    </>
  );
}
