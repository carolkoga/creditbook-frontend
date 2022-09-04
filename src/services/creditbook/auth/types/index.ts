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

export type RegistrationParams = {
  profilePicture: File,

  passwordConfirmation: string,
  nationality: string,
  cellphone: string,
  fullName: string,
  password: string,
  email: string,
  rg: string,

  cnpj?: string,
  cpf: string,

  bornDate: string,

  address: Address,

  type: AccountTypes,
};
