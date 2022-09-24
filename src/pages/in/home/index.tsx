import LawsuitCardList from '@components/LawsuitCard';
import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper/index';
import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import { Section } from '@components/Section';

import { lawsuitsMock } from '@mocks/suits';
import SelectAdsFilters from '@components/SelectAdsFilters';
import { Direction } from '@components/Direction';

import { Link } from '@components/Button';
import LawsuitNewCard from '@components/LawsuitCard/newCard';
import { LawsuitParamsID } from '@type/creditbook/Lawsuits';

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
        <LawsuitCardSwiper lawsuits={lawsuitsMock} />
      </Section.Container>

      <Section.Container>
        <LawsuitNewCard lawsuit={{
          id: '1',
          processGender: 'civel',
          actionPhase: 'cumprimentoDeSentenca',
          city: 'São Paulo',
          uf: 'SP',
          kind: 'acaoCondenatoria',
          batchId: '12',
        } as LawsuitParamsID}
        />
      </Section.Container>

      <Section.Container>
        <Section.Header>
          <Section.Title as="h3">Anúncios gerais</Section.Title>
          <SelectAdsFilters />
        </Section.Header>

        <ListLayoutSingleLawsuits>
          <LawsuitCardList lawsuits={lawsuitsMock} />
        </ListLayoutSingleLawsuits>
      </Section.Container>
    </>
  );
}
