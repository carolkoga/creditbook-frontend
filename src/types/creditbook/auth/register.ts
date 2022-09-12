import { AccountTypes, Address } from '..';

export interface AccountCommonParams {
  profilePicture: File,

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
  type: AccountTypes,
}

export interface AccountCorporation extends AccountCommonParams {
  cnpj: string,
  corporationName: string,
}

export interface AccountPerson extends AccountCommonParams {}

export type RegistrationParams<AccountType extends AccountTypes> = AccountType extends 'corporation' ? AccountCorporation : AccountPerson;
