import * as yup from 'yup';
import { commonValidationSchema, corporationValidation } from '.';

const updateValidation = {
  ...commonValidationSchema,
  currentPassword: yup.string()
    .notRequired()
    .test('Least a uppercase letter', 'No mínimo uma letra maiúscula', (value: any) => (/[A-Z]/).test(value))
    .test('Least a non-alphanumeric', 'No mínimo um caracter especial', (value: any) => (/\W/).test(value))
    .test('Least a number', 'No mínimo um número', (value: any) => (/\d/).test(value))
    .min(8, 'Sua senha precisa ter no mínimo 8 caracteres'),
  newPassword: yup.string()
    .notRequired()
    .oneOf([yup.ref('password')], 'As senhas não correspondem'),
};

export const updatePersonAccountSchema = yup.object({
  ...updateValidation,
});

export const updateCorporationAccountSchema = yup.object({
  ...updateValidation,
  ...corporationValidation,
});
