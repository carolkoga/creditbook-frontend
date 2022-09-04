import LawsuitCardList from '@components/LawsuitCard';
import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import { WrapperSelects } from '@components/pages/ads';
import SearchBox from '@components/Search';
import { Select } from '@components/Select';
import { lawsuitsMock } from '@mocks/suits';
import { Section } from '@components/Section';

const suitsTypesOptions = [
  {
    label: 'Cívil',
    value: 'civil',
  },

  {
    label: 'Trabalhista',
    value: 'labor',
  },

  {
    label: 'Fiscal',
    value: 'fiscal',
  },

  {
    label: 'Precatório',
    value: 'precatory',
  },
];

const suitsValuesOptions = [
  {
    label: '10.500,00 - 20.5000,00',
    value: '10.500-20.500',
  },

  {
    label: '20.500,00 - 30.5000,00',
    value: '20.500-30.500',
  },

  {
    label: '40.500,00 - 50.5000,00',
    value: '40.500-50.500',
  },

  {
    label: '50.500,00 - 60.5000,00',
    value: '50.500-60.500',
  },
];

const stateSuitsOptions = [
  {
    label: 'Em Andamento',
    value: 'processing',
  },

  {
    label: 'Indiciado',
    value: 'indiciado',
  },
];

export default function SingleLawsuits() {
  return (
    <>
      <Section.Header>
        <Section.Title as="h1">Anúncios Individuais</Section.Title>
        <SearchBox onSearch={() => console.log('olá')} style={{ marginTop: '42px' }} />
        <WrapperSelects>
          <Select options={suitsTypesOptions} placeholder="Tipo de processo" width={166} />
          <Select options={stateSuitsOptions} placeholder="Estado de processo" width={166} />
          <Select options={suitsValuesOptions} placeholder="Valor de processo" width={166} />
        </WrapperSelects>
      </Section.Header>

      <Section.Container>
        <ListLayoutSingleLawsuits>
          <LawsuitCardList access="not logged" lawsuits={lawsuitsMock} />
        </ListLayoutSingleLawsuits>
      </Section.Container>
    </>
  );
}
