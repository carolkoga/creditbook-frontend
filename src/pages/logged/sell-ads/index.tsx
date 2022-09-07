import LawsuitCardList from '@components/LawsuitCard';
import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import SearchBox from '@components/Search';
import { lawsuitsMock } from '@mocks/suits';
import { Section } from '@components/Section';
import SelectAdsFilters from '@components/SelectAdsFilters';
import { Direction } from '@components/Direction';
import Link from 'next/link';
import { Button } from '@components/Button/styled';

export default function SellAds() {
  return (
    <>
      <Section.Header>
        <Direction direction="horizontal" alignItems="center">
          <Direction direction="horizontal">
            <Link href="/ads/new">
              <Button as="a">
                Adicionar
              </Button>
            </Link>
            <Link href="/ads/lots">
              <Button as="a">
                Ver Lotes
              </Button>
            </Link>
          </Direction>
          <Section.Title as="h1">Meus anúncios</Section.Title>
        </Direction>
        <SearchBox onSearch={() => console.log('olá')} width={365} />
        <SelectAdsFilters />
      </Section.Header>

      <Section.Container>
        <ListLayoutSingleLawsuits>
          <LawsuitCardList access="logged" lawsuits={lawsuitsMock} />
        </ListLayoutSingleLawsuits>
      </Section.Container>
    </>
  );
}
