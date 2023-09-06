import * as yup from 'yup';
import { commonValidationSchema, corporationValidation } from '.';

const updateValidation = {
  ...commonValidationSchema,
  currentPassword: yup
    .string()
    .nullable()
    .when({
      is: (value: any) => !!value,
      then: (rule) => rule.test('Least a non-alphanumeric', 'A sua senha têm no mínimo um caracter especial', (value: any) => (/\W/).test(value)),
    })
    .when({
      is: (value: any) => !!value,
      then: (rule) => rule.test('Least a non-alphanumeric', 'A sua senha têm no mínimo um caracter especial', (value: any) => (/\W/).test(value)),
    })
    .when({
      is: (value: any) => !!value,
      then: (rule) => rule.test('Least a number', 'A sua senha têm no mínimo um número', (value: any) => (/\d/).test(value)),
    })
    .when({
      is: (value: any) => !!value,
      then: (rule) => rule.min(8, 'A sua senha têm no mínimo 8 caracteres'),
    }),
  newPassword: yup.string()
    .nullable()
    .when('currentPassword', {
      is: (value: any) => !!value,
      then: (rule) => rule.validatePassword(),
    }),
};

export const updatePersonAccountSchema = yup.object().shape({
  ...updateValidation,
  address: yup.object().nullable(),
}, [['currentPassword', 'currentPassword']]);

export const updateCorporationAccountSchema = yup.object().shape({
  ...updateValidation,
  ...corporationValidation,
  address: yup.object().nullable(),
}, [['currentPassword', 'currentPassword']]);
