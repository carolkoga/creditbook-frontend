import LawsuitCardList from '@components/LawsuitCard';
import SearchBox from '@components/Search';
import { Section } from '@components/Section';
import SelectAdsFilters from '@components/SelectAdsFilters';
import { lawsuitService } from '@services/creditbook/lawsuit';
import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { GetServerSideProps } from 'next';

interface IProps {
  announcementsFavorites: LawsuitParams[] | null,
}

export default function MyFavorites({ announcementsFavorites }: IProps) {
  return (
    <>
      <Section.Header>
        <Section.Title as="h1">Meus Favoritos</Section.Title>
        <SearchBox onSearch={() => console.log('olá')} />
        <SelectAdsFilters />
      </Section.Header>

      <Section.Container>
        {!announcementsFavorites && (
          <Section.Title textColor="dark">Sem anúncios favoritado</Section.Title>
        )}
        <LawsuitCardList lawsuits={announcementsFavorites} />
      </Section.Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await lawsuitService.listAll({
    params: {
      isFavorite: true,
    },
  });

  return {
    props: {
      announcementsFavorites: data.announcements,
    },
  };
};
