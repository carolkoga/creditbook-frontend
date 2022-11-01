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
        <AnnouncementList
          {...response}
          notFoundProps={{
            title: response.announcements?.results?.length <= 0 ? 'Ainda não possui anúncio cadastrado' : '',
            reloadPage: false,
            href: '/in/ads/new',
            labelButton: 'Cadastrar Agora',
          }}
        />
      </Section.Container>
    </>
  );
}
