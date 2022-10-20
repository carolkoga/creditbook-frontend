import LawsuitCardList from '@components/LawsuitCard';
import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import SearchBox from '@components/Search';
import { lawsuitsMock } from '@mocks/suits';
import { Section } from '@components/Section';
import SelectAdsFilters from '@components/SelectAdsFilters';
import { Direction } from '@components/Direction';

export default function SellAds() {
  return (
    <>
      <Section.Header>
        <Direction direction="horizontal" alignItems="center">
          <Section.Title as="h1">Meus anúncios</Section.Title>
        </Direction>
        <SearchBox onSearch={() => console.log('olá')} />
        <SelectAdsFilters />
      </Section.Header>

      <Section.Container>
        <ListLayoutSingleLawsuits>
          <LawsuitCardList lawsuits={lawsuitsMock as any} />
        </ListLayoutSingleLawsuits>
      </Section.Container>
    </>
  );
}
