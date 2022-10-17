import SearchBox from '@components/Search';
import { Section } from '@components/Section';
import SelectAdsFilters from '@components/SelectAdsFilters';

export default function GalleryPremium() {
  return (
    <>
      <Section.Header>
        <Section.Title as="h1">Galeria Premium</Section.Title>
        <SearchBox onSearch={() => console.log('olá')} />
        <SelectAdsFilters />
      </Section.Header>

      <Section.Container>
        <Section.Title textColor="dark">Sem anúncios na galeria premium</Section.Title>
      </Section.Container>
    </>
  );
}
