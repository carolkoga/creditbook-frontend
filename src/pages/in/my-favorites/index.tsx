// import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import { Section } from '@components/Section';

// import useAuth from '@hooks/useAuth';
import AnnouncementList from '@components/LawsuitCard';
import useAnnouncements from '@services/creditbook/lawsuit/hooks/useAnnouncements';

export default function MyFavorites() {
  // const { user } = useAuth();
  const response = useAnnouncements(undefined, {
    params: {
      isFavorite: true,
    },
  });

  // function handleProcessAnnouncementsFiltered(lawsuit: ResponseFilterCreditsProps) {
  //   response.mutate(lawsuit as never);
  //   if (lawsuit.results.length <= 0) {
  //     response.mutateIsFiltered(false);
  //   }
  //   response.mutateIsFiltered(true);
  // }

  return (
    <>
      <Section.Header>
        <Section.Title as="h1">
          Meus favoritos
          {/* {!response.isFiltered && 'Meus favoritos'}
          {response.isFiltered && 'Anúncios relacionados ao filtro'} */}
        </Section.Title>
        {/* <FilterDrawer
          onGetResponseResults={handleProcessAnnouncementsFiltered}
          customQuery={{
            userId: user?.id,
            isFavorite: true,
          }}
        /> */}
      </Section.Header>

      <Section.Container>
        <AnnouncementList
          {...response}
          notFoundProps={{
            title: response.announcements?.results?.length <= 0 ? 'Ainda não possui anúncios favoritados' : '',
            type: 'link',
            href: '/in/buy-credits',
            labelButton: 'Favoritar anúncios',
          }}
        />

      </Section.Container>
    </>
  );
}
