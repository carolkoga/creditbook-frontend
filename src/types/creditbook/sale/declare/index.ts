export interface FieldDeclareFormTypes {
  processInfo: {
    processId: string,
  },

  buyer: {
    personType: string,
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
    paymentMethod: string,
    paymentType: string,
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
}
