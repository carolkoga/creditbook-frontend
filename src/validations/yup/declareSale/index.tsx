import { OptionType } from '@components/Select';
import {
  validateCep, validateCNPJ, validateCPF, validateUF,
} from 'validations-br';
import * as yup from 'yup';

const testNegativeLogic = {
  name: 'number not be negative',
  message: 'Número não pode ser negativo',
  test: (number: unknown) => Number(number) > 0,
};

const stepProcessInfo = yup.object().shape({
  processId: yup.mixed().required().transform((option) => option?.value),
});

const stepBuyer = yup.object().shape({
  personType: yup.string().oneOf(['pj', 'pf']).required().default('pj'),

  pj: yup.object().when('personType', {
    is: (personType: 'pj' | 'pf') => personType?.toLowerCase() === 'pj',
    then: (rule) => rule.shape({
      socialName: yup.string().required(),
      cnpj: yup.string().required().test('CNPJ is invalid', 'CNPJ é inválido', (value) => validateCNPJ(value ?? '')),
      email: yup.string().required().email(),
      cellphone: yup.string().required(),
    }),
    otherwise: (rule) => rule.nullable(),
  }),

  pf: yup.object().when('personType', {
    is: (personType: 'pj' | 'pf') => personType?.toLowerCase() === 'pf',
    then: (rule) => rule.shape({
      name: yup.string().required(),
      cpf: yup.string().required().test('CPF is invalid', 'CPF inválido', (value) => validateCPF(value ?? '')),
      rg: yup.string().required(),
      email: yup.string().required().email(),
      cellphone: yup.string().required(),
    }),
    otherwise: (rule) => rule.nullable(),
  }),
});

const stepPaymentInfo = yup.object().shape({
  paymentMethod: yup.object().required(),
  paymentType: yup.string().required(),

  installments: yup.string().when('paymentType', {
    is: (paymentType: string) => paymentType?.toLowerCase() === 'installments',
    then: (rule) => rule.required(),
    otherwise: (rule) => rule.nullable(),
  }),

  bankInfo: yup.object().when('paymentMethod', {
    is: (paymentMethod: OptionType | undefined) => paymentMethod?.value?.toLowerCase() === 'transferencia',
    then: (rule) => rule.shape({
      accountType: yup.string().required().transform((option: any) => option?.value),
      bank: yup.string().required(),
      numberAccount: yup.string().required().test(testNegativeLogic),
      agency: yup.string().required().test(testNegativeLogic),
      holder: yup.string().required(),
      cpf: yup.string().test('CPF is invalid', 'CPF inválido', (value) => validateCPF(value ?? '')),
      cnpj: yup.string().test('CPF is invalid', 'CNPJ inválido', (value) => validateCNPJ(value ?? '')),
    }),
    otherwise: (rule) => rule.nullable(),
  }),
});

const addressValidationSchema = yup.object().shape({
  cep: yup.string()
    .required('Campo obrigatório')
    .test('CEP is invalid', 'Digite um CEP válido', async (value: any) => validateCep(value)),
  uf: yup.string().required('Campo obrigatório').test('uf', 'Digite um UF válido', (value: any) => validateUF(value)),
  number: yup.string().required('Campo obrigatório'),
  complement: yup.string().notRequired(),
  address: yup.string().required('Campo obrigatório'),
  city: yup.string().required('Campo obrigatório'),
});

export const declareSaleValidation = yup.object({
  processInfo: stepProcessInfo.required(),
  buyer: stepBuyer.required(),
  payment: stepPaymentInfo.required(),
  address: addressValidationSchema.required(),
  processPrice: yup.string().required(),
  emitContract: yup.string().required(),
});
