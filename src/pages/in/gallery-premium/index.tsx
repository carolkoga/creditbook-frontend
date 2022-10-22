import LawsuitCardList from '@components/LawsuitCard';
import SearchBox from '@components/Search';
import { Section } from '@components/Section';
import SelectAdsFilters from '@components/SelectAdsFilters';
import { lawsuitService } from '@services/creditbook/lawsuit';
import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { GetServerSideProps } from 'next';

interface IProps {
  announcementsPremium: LawsuitParams[] | null,
}

export default function GalleryPremium({ announcementsPremium }: IProps) {
  return (
    <>
      <Section.Header>
        <Section.Title as="h1">Galeria Premium</Section.Title>
        <SearchBox onSearch={() => console.log('olá')} />
        <SelectAdsFilters />
      </Section.Header>

      <Section.Container>
        {!announcementsPremium && (
          <Section.Title textColor="dark">Sem anúncios na galeria premium</Section.Title>
        )}
        <LawsuitCardList lawsuits={announcementsPremium} />
      </Section.Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await lawsuitService.listAll({
    params: {
      isPremium: true,
    },
  });

  return {
    props: {
      announcementsPremium: data.announcements,
    },
  };
};
