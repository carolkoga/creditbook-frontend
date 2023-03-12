import { OptionType } from '@components/Select';

export interface FieldDeclareFormTypes {
  processInfo: {
    processId: string,
  },

  buyer: {
    personType: 'pj' | 'pf',
    pj?: {
      socialName: string,
      cnpj: string,
      email: string,
      cellphone: string,
    },

    pf?: {
      name: string,
      cpf: string,
      rg: string,
      email: string,
      cellphone: string,
    }
  },

  payment: {
    paymentMethod: OptionType,
    paymentType: 'installments' | 'cash',
    installments?: string,
    bankInfo: {
      accountType: string,
      bank: string,
      numberAccount: string,
      agency: string,
      holder: string,
      cpf?: string,
      cnpj?: string,
    }
  },

  address: {
    cep: string,
    uf: string,
    number: string,
    complement: string,
    address: string,
    city: string,
  },

  processPrice: string | number,
  emitContract: boolean | string,
}
