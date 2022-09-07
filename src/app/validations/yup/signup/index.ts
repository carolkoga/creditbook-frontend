import * as yup from 'yup';
import { setLocale } from 'yup';
import { validateCNPJ, validateCPF, validateUF } from 'validations-br';

setLocale({
  string: {
    email: 'Digite um e-mail válido',
  },

  mixed: {
    required: 'Campo obrigatório',
  },
});

const addressValidationSchema = yup.object().shape({
  cep: yup.string()
    .required('Campo obrigatório')
    .transform((currentValue) => (
      currentValue.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1-')
    )),
  uf: yup.string().required('Campo obrigatório').test('uf', 'Digite um UF válido', (value: any) => validateUF(value)),
  number: yup.string().required('Campo obrigatório'),
  complement: yup.string().notRequired(),
  address: yup.string().required('Campo obrigatório'),
  city: yup.string().required('Campo obrigatório'),
});

const commonValidationSchema = {
  profilePicture: yup.mixed(),
  nationality: yup.object().required(),
  cellphone: yup.string().required('Campo obrigatório'),
  fullName: yup.string().required('Campo obrigatório'),
  password: yup.string()
    .required('Campo obrigatório')
    .test('Least a uppercase letter', 'No mínimo uma letra maiúscula', (value: any) => (/[A-Z]/).test(value))
    .test('Least a non-alphanumeric', 'No mínimo um caracter especial', (value: any) => (/\W/).test(value))
    .test('Least a number', 'No mínimo um número', (value: any) => (/\d/).test(value))
    .min(8, 'Sua senha precisa ter no mínimo 8 caracteres'),
  passwordConfirmation: yup.string()
    .required('Campo obrigatório')
    .oneOf([yup.ref('password')], 'As senhas não correspondem'),

  email: yup.string().email().required('Campo obrigatório'),
  rg: yup.string().required('Campo obrigatório'),

  cpf: yup.string()
    .required()
    .test(
      'cpf',
      'Digite um CPF válido',
      (value: any) => validateCPF(value),
    ),

  bornDate: yup.string().required('Campo obrigatório'),

  address: addressValidationSchema,
};

export const registerPersonAccountSchema = yup.object({ ...commonValidationSchema });

export const registerCorporationAccountSchema = yup.object({
  ...commonValidationSchema,
  cnpj: yup.string().test(
    'cnpj',
    'Digite um CNPJ válido',
    (value: any) => validateCNPJ(value),
  ).required(),
  corporationName: yup.string().required(),
});
