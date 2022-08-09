import { ISuits } from './Suits';

export interface ILawSuits {
  id: string,
  courtCase: string,
  suit: keyof ISuits<string>,
  stateOfProcess: string,
  pledgeOrSecure: string,
  valueSuit: number,
  income: number,
  address: {
    city: string,
    state: string,
  }
  isPremium: boolean,
  isFavorite: boolean,
}
