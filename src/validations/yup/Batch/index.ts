import * as yup from 'yup';

export const schemaBatchFormValidation = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  value: yup.string().required(),
});
