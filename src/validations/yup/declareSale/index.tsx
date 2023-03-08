import { validateCep, validateCNPJ, validateCPF } from 'validations-br';
import * as yup from 'yup';

const stepProcessInfo = yup.object().shape({
  processNumber: yup.mixed().required().transform((option) => option?.value),
});

const stepBuyer = yup.object().shape({
  personType: yup.string().required(),

  pj: yup.object().when('personType', {
    is: (personType: 'pj' | 'pf') => personType.toLowerCase() === 'pj',
    then: (rule) => rule.shape({
      socialName: yup.string().required(),
      cnpj: yup.string().required().test('CNPJ is invalid', 'CNPJ é inválido', (value) => validateCNPJ(value ?? '')),
      email: yup.string().required().email(),
      cellphone: yup.string().required(),
    }),
    otherwise: (rule) => rule.nullable(),
  }),

  pf: yup.object().when('personType', {
    is: (personType: 'pj' | 'pf') => personType.toLowerCase() === 'pf',
    then: (rule) => rule.shape({
      name: yup.string().required(),
      cpf: yup.string().required().test('CPF is invalid', 'CPF é inválido', (value) => validateCPF(value ?? '')),
      rg: yup.string().required(),
      email: yup.string().required().email(),
      cellphone: yup.string().required(),
    }),
    otherwise: (rule) => rule.nullable(),
  }),

  address: yup.object().shape({
    cep: yup.string().test('CEP is invalid', 'CEP é inválido', (value) => validateCep(value ?? '')),
    city: yup.string().required(),
    uf: yup.string().required(),
    address: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string().required(),
  }).required(),

  processPrice: yup.number().required(),
});

const stepPaymentInfo = yup.object().shape({

});

export const declareSaleValidation = yup.object({
  processInfo: stepProcessInfo.required(),
  buyer: stepBuyer.required(),
  payment: stepPaymentInfo.required(),
});
