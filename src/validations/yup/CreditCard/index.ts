import * as yup from 'yup';
import credit from 'card-validator';

export const creditCardSchemaValidation = yup.object().shape({
  cardNumber: yup.string()
    .test({
      name: 'validate credit card number',
      message: 'Digite um número do cartão válido',
      test: (value: any) => credit.number(value).isValid,
    }),

  validate: yup.string()
    .test(
      'Invalid expiration date',
      'Data de expiração inválida',
      (value: any) => credit.expirationDate(value).isPotentiallyValid,
    )
    .required(),

  secureCode: yup.string()
    .test({
      name: 'Invalid secure code',
      message: 'Digito de segurança invalido',
      test: (value: any) => credit.cvv(value).isPotentiallyValid,
    }),

  completeName: yup.string()
    .test({
      name: 'It is name valid',
      message: 'Digite um nome válido',
      test: (value: any) => credit.cardholderName(value).isValid,
    }),
});
