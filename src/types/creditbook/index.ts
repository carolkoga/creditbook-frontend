export type AccountTypes = 'person' | 'corporation';

export type Address = {
  cep: string,
  uf: string,
  number: string,
  complement: string,
  address: string,
  city: string,
};
