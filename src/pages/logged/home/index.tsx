import LawsuitCardList from '@components/LawsuitCard';
import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper/index';
import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import { Section } from '@components/Section';

import { lawsuitsMock } from '@mocks/suits';
import SelectAdsFilters from '@components/SelectAdsFilters';

export default function Home() {
  return (
    <>
      <Section.Container bg="light">
        <Section.Title as="h3">Galeria Premium</Section.Title>
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
