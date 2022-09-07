export type AccountTypes = 'person' | 'corporation';

export type Address = {
  cep: string,
  uf: string,
  number: string,
  complement: string,
  address: string,
  city: string,
};

export type LoginParams = {
  password: string;
  email: string;
};

interface AccountCommonParams {
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

interface AccountCorporation extends AccountCommonParams {
  cnpj: string,
  corporationName: string,
}

interface AccountPerson extends AccountCommonParams {}

export type RegistrationParams<AccountType extends AccountTypes> = AccountType extends 'corporation' ? AccountCorporation : AccountPerson;
