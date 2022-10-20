// import LawsuitCardList from '@components/LawsuitCard';
import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import SearchBox from '@components/Search';
// import { lawsuitsMock } from '@mocks/suits';
import { Section } from '@components/Section';
import SelectAdsFilters from '@components/SelectAdsFilters';

export default function SingleLawsuits() {
  return (
    <>
      <Section.Header>
        <Section.Title as="h1">Anúncios</Section.Title>
        <SearchBox onSearch={() => console.log('olá')} />
        <SelectAdsFilters />
      </Section.Header>

      <Section.Container>
        <ListLayoutSingleLawsuits>
          {/* <LawsuitCardList lawsuits={lawsuitsMock as any} /> */}
        </ListLayoutSingleLawsuits>
      </Section.Container>
    </>
  );
}
