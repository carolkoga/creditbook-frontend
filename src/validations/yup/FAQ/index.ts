import * as yup from 'yup';

export const FAQSchemaValidation = yup.object().shape({
  section: yup.mixed().required('Campo obrigatório').transform((val: any) => val.value),
  question: yup.string().required('Campo obrigatório'),
  answer: yup.string().required('Campo obrigatório'),
});
