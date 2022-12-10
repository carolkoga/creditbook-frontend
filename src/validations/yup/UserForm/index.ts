import * as yup from 'yup';
import {
  validateCep, validateCNPJ, validateCPF, validateUF,
} from 'validations-br';

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

export const corporationValidation = {
  cnpj: yup
    .string()
    .required()
    .test(
      'cnpj',
      'Digite um CNPJ válido',
      (value: any) => validateCNPJ(value),
    ),
  corporationName: yup.string().required(),
};

const passwordValidation = {
  password: yup.string().validatePassword(),
  passwordConfirmation: yup.string()
    .required('Campo obrigatório')
    .oneOf([yup.ref('password')], 'As senhas não correspondem'),
};

export const commonValidationSchema = {
  profilePicture: yup
    .mixed()
    // @ts-ignore
    .test((option: File | undefined | null | string, rule) => {
      if (typeof option === 'string') return option;
      if (typeof option === 'undefined' || !option) return true;

      function bytesToMB(number: number) {
        return number / (1000) ** 2;
      }

      const fileSize = option?.size;

      if (bytesToMB(fileSize) > 1) {
        return rule.createError({ message: 'O tamanho da imagem precisa ser menor que 1 MB' });
      }

      return option;
    }),
  nationality: yup.mixed().typeError('Campo obrigatório'),
  cellphone: yup.string().required('Campo obrigatório'),
  fullName: yup.string().required('Campo obrigatório'),

  email: yup.string().email().required('Campo obrigatório'),
  rg: yup.string().required('Campo obrigatório'),

  cpf: yup.string()
    .required()
    .test(
      'cpf',
      'Digite um CPF válido',
      (value: any) => validateCPF(value),
    ),

  address: addressValidationSchema,
};

export const registerPersonAccountSchema = yup.object({
  ...commonValidationSchema,
  ...passwordValidation,

  bornDate: yup
    .string()
    .required('Campo obrigatório')
    .test(
      '+18',
      'Menores de idade não é permitido',
      (value: any) => {
        const currentYear = new Date().getFullYear();
        const bornYear = new Date(value).getFullYear();
        return (currentYear - bornYear) >= 18;
      },
    ),
});

export const registerCorporationAccountSchema = yup.object({
  ...commonValidationSchema,
  ...passwordValidation,
  ...corporationValidation,
  bornDate: yup
    .string()
    .required('Campo obrigatório'),
});
