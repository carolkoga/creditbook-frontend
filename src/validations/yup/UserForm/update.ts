import * as yup from 'yup';
import { commonValidationSchema, corporationValidation } from '.';

const updateValidation = {
  ...commonValidationSchema,
  currentPassword: yup
    .string()
    .nullable()
    .when({
      is: (value: any) => !!value,
      then: (rule) => rule.test('Least a non-alphanumeric', 'No mínimo um caracter especial', (value: any) => (/\W/).test(value)),
    })
    .when({
      is: (value: any) => !!value,
      then: (rule) => rule.test('Least a non-alphanumeric', 'No mínimo um caracter especial', (value: any) => (/\W/).test(value)),
    })
    .when({
      is: (value: any) => !!value,
      then: (rule) => rule.test('Least a number', 'No mínimo um número', (value: any) => (/\d/).test(value)),
    })
    .when({
      is: (value: any) => !!value,
      then: (rule) => rule.min(8, 'Sua senha precisa ter no mínimo 8 caracteres'),
    }),
  newPassword: yup.string()
    .notRequired()
    .oneOf([yup.ref('currentPassword')], 'As senhas não correspondem'),
};

export const updatePersonAccountSchema = yup.object().shape({
  ...updateValidation,
}, [['currentPassword', 'currentPassword']]);

export const updateCorporationAccountSchema = yup.object().shape({
  ...updateValidation,
  ...corporationValidation,
}, [['currentPassword', 'currentPassword']]);
