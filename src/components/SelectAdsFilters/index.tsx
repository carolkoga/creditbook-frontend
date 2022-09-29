import { Select } from '@components/Select';

import { WrapperSelects } from './styled';

const suitsTypesOptions = [
  {
    label: 'Cível',
    value: 'civel',
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

export default function SelectAdsFilters() {
  return (
    <WrapperSelects>
      <Select options={suitsTypesOptions} placeholder="Tipo de processo" />
      <Select options={stateSuitsOptions} placeholder="Estado de processo" />
      <Select options={suitsValuesOptions} placeholder="Valor de processo" />
    </WrapperSelects>
  );
}
