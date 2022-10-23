import * as yup from 'yup';

const getValueReactSelect = yup.mixed().transform((val: any) => val?.value);

export const filterSchemaValidation = yup.object().shape({
  actionPhase: getValueReactSelect,
  processGender: getValueReactSelect,
  kind: getValueReactSelect,
  tribunal: getValueReactSelect,
  uf: getValueReactSelect,
  city: getValueReactSelect,
});
