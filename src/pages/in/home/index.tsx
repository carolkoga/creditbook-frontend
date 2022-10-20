import LawsuitCardList from '@components/LawsuitCard';
// import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper/index';
import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import { Section } from '@components/Section';

import SelectAdsFilters from '@components/SelectAdsFilters';
import { Direction } from '@components/Direction';

import { Link } from '@components/Button';
import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { GetServerSideProps } from 'next';
import { lawsuitService } from '@services/creditbook/lawsuit';

interface IProps {
  announcements: LawsuitParams[],
}

export default function Home({ announcements }: IProps) {
  return (
    <>
      <Section.Container bg="light">
        <Direction direction="horizontal" alignItems="center">
          <Section.Title as="h3">Galeria Premium</Section.Title>
          <Link href="/in/gallery-premium" variant="dark">
            Ver Todos
          </Link>
        </Direction>
        {/* <LawsuitCardSwiper lawsuits={lawsuitsMock as any} /> */}
      </Section.Container>

      <Section.Container>
        <Section.Header>
          <Section.Title as="h3">Anúncios gerais</Section.Title>
          <SelectAdsFilters />
        </Section.Header>

        <ListLayoutSingleLawsuits>
          <LawsuitCardList lawsuits={announcements} />
        </ListLayoutSingleLawsuits>
      </Section.Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await lawsuitService.listAll();
  console.log(data);

  return {
    props: {
      announcements: data,
    },
  };
};
