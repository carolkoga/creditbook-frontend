import { AccountTypes, Address } from '..';

export interface AccountCommonParams {
  profilePicture: File | null | string,

  passwordConfirmation: string,
  nationality: string,
  cellphone: string,
  fullName: string,
  password: string,
  email: string,
  rg: string,
  cpf: string,
  bornDate: string,
  address: Address,
}

export interface AccountCorporation extends AccountCommonParams {
  cnpj: string,
  corporationName: string,
  type: 'corporation'
}

export interface AccountPerson extends AccountCommonParams {
  type: 'person'
}

export type RegistrationParams<AccountType extends AccountTypes> = AccountType extends 'corporation' ? AccountCorporation : AccountPerson;
