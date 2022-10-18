import * as yup from 'yup';

export const EmailFormValidationSchema = yup.object().shape({
  email: yup.string().required('Campo obrigatório').email('Digite um email váilido'),
});

export const PasswordFormValidationSchema = yup.object().shape({
  newPassword: yup.string().required('Campo obrigatório').validatePassword(),
  newPasswordConfirmation: yup.string().oneOf([yup.ref('newPassword')], 'Senhas não conferem'),
});
