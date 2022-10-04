import { setLocale } from 'yup';

setLocale({
  string: {
    email: 'Digite um e-mail válido',
  },

  mixed: {
    required: 'Campo obrigatório',
  },
});
