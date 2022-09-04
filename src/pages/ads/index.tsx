import LawsuitCardList from '@components/LawsuitCard';
import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import SearchBox from '@components/Search';
import { lawsuitsMock } from '@mocks/suits';
import { Section } from '@components/Section';
import SelectAdsFilters from '@components/SelectAdsFilters';

export default function SingleLawsuits() {
  return (
    <>
      <Section.Header>
        <Section.Title as="h1">Anúncios Individuais</Section.Title>
        <SearchBox onSearch={() => console.log('olá')} style={{ marginTop: '42px' }} />
        <SelectAdsFilters />
      </Section.Header>

      <Section.Container>
        <ListLayoutSingleLawsuits>
          <LawsuitCardList access="not logged" lawsuits={lawsuitsMock} />
        </ListLayoutSingleLawsuits>
      </Section.Container>
    </>
  );
}
