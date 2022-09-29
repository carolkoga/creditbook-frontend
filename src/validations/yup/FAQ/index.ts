import * as yup from 'yup';

export const FAQSchemaValidation = yup.object().shape({
  section: yup.mixed().required('Campo obrigatório').transform((val: any) => val.value),
  title: yup.string().required('Campo obrigatório'),
  answer: yup.string().required('Campo obrigatório'),
  id: yup.string(),
});
