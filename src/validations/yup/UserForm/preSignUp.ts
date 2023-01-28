import * as yup from 'yup';

export const preSignUpValidation = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required('Campo obrigatório'),
  cellphone: yup.string().required('Campo obrigatório'),
});
