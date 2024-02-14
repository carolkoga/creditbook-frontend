import { OptionType } from '@components/Select';

export interface FieldDeclareFormTypes {
  processInfo: {
    processId: OptionType,
    processType: 'announcement' | 'batch' | null | undefined,
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
      accountType: OptionType,
      bank: string,
      numberAccount: string,
      agency: string,
      holder: string,
      holderDocument: string,
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

  processPrice: string,
  emitContract: boolean | number,
}
