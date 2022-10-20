import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import SearchBox from '@components/Search';
// import LawsuitCardList from '@components/LawsuitCard';
// import { lawsuitsMock } from '@mocks/suits';
import { Section } from '@components/Section';
import SelectAdsFilters from '@components/SelectAdsFilters';

export default function BuyAds() {
  return (
    <>
      <Section.Header>
        <Section.Title as="h1">Comprar créditos</Section.Title>
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
