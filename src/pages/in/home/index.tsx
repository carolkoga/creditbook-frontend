import LawsuitCardList from '@components/LawsuitCard';
import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper/index';
import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import { Section } from '@components/Section';

import { lawsuitsMock } from '@mocks/suits';
import SelectAdsFilters from '@components/SelectAdsFilters';
import { Direction } from '@components/Direction';

import { Link } from '@components/Button';

export default function Home() {
  return (
    <>
      <Section.Container bg="light">
        <Direction direction="horizontal" alignItems="center">
          <Section.Title as="h3">Galeria Premium</Section.Title>
          <Link href="/in/gallery-premium" variant="dark">
            Ver Todos
          </Link>
        </Direction>
        <LawsuitCardSwiper access="admin" lawsuits={lawsuitsMock} />
      </Section.Container>

      <Section.Container>
        <Section.Header>
          <Section.Title as="h3">Anúncios gerais</Section.Title>
          <SelectAdsFilters />
        </Section.Header>

        <ListLayoutSingleLawsuits>
          <LawsuitCardList lawsuits={lawsuitsMock} access="logged" />
        </ListLayoutSingleLawsuits>
      </Section.Container>
    </>
  );
}
