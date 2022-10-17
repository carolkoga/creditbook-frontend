import SearchBox from '@components/Search';
import { Section } from '@components/Section';
import SelectAdsFilters from '@components/SelectAdsFilters';

export default function MyFavorites() {
  return (
    <>
      <Section.Header>
        <Section.Title as="h1">Meus Favoritos</Section.Title>
        <SearchBox onSearch={() => console.log('olá')} />
        <SelectAdsFilters />
      </Section.Header>

      <Section.Container>
        <Section.Title textColor="dark">Sem anúncios favoritado</Section.Title>
      </Section.Container>
    </>
  );
}
