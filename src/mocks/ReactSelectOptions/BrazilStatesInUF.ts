import { OptionType } from '@components/Select';
import { factoryOptionReactSelect } from '@utils/factoryOptionReactSelect';

export const brazilStatesInUF = [
  'RO',
  'AC',
  'AM',
  'RR',
  'TO',
  'MA',
  'PI',
  'CE',
  'RN',
  'PB',
  'PE',
  'AL',
  'SE',
  'BA',
  'MG',
  'ES',
  'RJ',
  'SP',
  'PR',
  'SC',
  'RS',
  'MS',
  'MT',
  'GO',
  'DF',
];

export const UFListAsOptionSelect: OptionType[] = brazilStatesInUF.map((_, index, array) => {
  const sortedUFs = array.sort();

  return factoryOptionReactSelect(index.toString(), index.toString(), sortedUFs);
});
