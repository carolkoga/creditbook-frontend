import { ILawSuits } from '../types/Lawsuits';

export const lawsuitsMock: ILawSuits[] = [
  {
    id: '1',
    courtCase: 'Título Judicial',
    suit: 'civil',
    stateOfProcess: 'Incidente de execução',
    pledgeOrSecure: 'Não',
    valueSuit: 1860569,
    income: 1860569,
    address: {
      city: 'São Paulo',
      state: 'SP',
    },
    isPremium: false,
    isFavorite: true,
  },

  {
    id: '0',
    courtCase: 'Título Judicial',
    suit: 'labor',
    stateOfProcess: 'Incidente de execução',
    pledgeOrSecure: 'Não',
    valueSuit: 1860569,
    income: 1860569,
    address: {
      city: 'São Paulo',
      state: 'SP',
    },
    isPremium: true,
    isFavorite: false,
  },

  {
    id: '3',
    courtCase: 'Título Judicial',
    suit: 'precatory',
    stateOfProcess: 'Incidente de execução',
    pledgeOrSecure: 'Não',
    valueSuit: 1860569,
    income: 1860569,
    address: {
      city: 'São Paulo',
      state: 'SP',
    },
    isPremium: true,
    isFavorite: true,
  },

  {
    id: '2',
    courtCase: 'Título Judicial',
    suit: 'fiscal',
    stateOfProcess: 'Incidente de execução',
    pledgeOrSecure: 'Não',
    valueSuit: 1860569,
    income: 1860569,
    address: {
      city: 'São Paulo',
      state: 'SP',
    },
    isPremium: true,
    isFavorite: false,
  },
];
