import { MixedSchema } from 'yup/lib/mixed';
import { validateUF } from 'validations-br';
import * as yup from 'yup';

const fileNotRequired = {
  is: (value: any) => value.toLowerCase() !== 'digital',
  then: (rule: MixedSchema) => rule.notRequired(),
  otherwise: (rule: MixedSchema) => rule.transform(() => null),
};

export const newLawsuitSchemaValidation = yup.object().shape({
  processNumber: yup.string().required('Campo obrigatório'),
  type: yup.string().oneOf(['digital', 'physical']).required(),
  uf: yup.mixed()
    .required('Escolha um estado')
    .test('uf', 'Digite um UF válido', (val: any) => validateUF(val))
    .transform((val: any) => val.value),

  city: yup.mixed()
    .transform((val: any) => val.value)
    .required('Campo obrigatório'),

  tribunal: yup.mixed()
    .transform((val: any) => val.value)
    .required('Campo obrigatório'),

  processGender: yup.mixed()
    .transform((val: any) => val.value)
    .required('Campo obrigatório'),

  actionPhase: yup.mixed()
    .transform((val: any) => val.value)
    .required('Campo obrigatório'),

  kind: yup.mixed()
    .transform((val: any) => val.value)
    .required('Campo obrigatório'),

  mainActorCorporationNameOrName: yup.string().required('Campo obrigatório'),
  mainActorCpfOrCnpj: yup.string()
    .required('Campo obrigatório')
    .cpfOrcnpj(),

  secondaryActorCorporationNameOrName: yup.string().nullable().notRequired(),
  secondaryActorCpfOrCnpj: yup.string()
    .nullable()
    .when({
      is: (val: any) => val,
      then: (rule) => rule.cpfOrcnpj(),
    })
    .notRequired(),

  mainDefendantCorporationNameOrName: yup.string().required('Campo obrigatório'),
  mainDefendantCpjOrCnpj: yup.string()
    .required('Campo obrigatório')
    .cpfOrcnpj(),

  secondaryDefendantCorporationNameOrName: yup.string().nullable().notRequired(),
  secondaryDefendantCpjOrCnpj: yup.string()
    .nullable()
    .when({
      is: (val: any) => val,
      then: (rule) => rule.cpfOrcnpj(),
    })
    .notRequired(),

  digitalProcess: yup.string()
    .nullable()
    .when('type', {
      is: (value: any) => value.toLowerCase() === 'digital',
      then: (rule) => rule.url('Digite uma URL válida').required('Campo Obrigatório'),
      otherwise: (rule) => rule.transform(() => null),
    }),

  // Files
  inicialPetition: yup.mixed()
    .nullable()
    .transform((val: any) => val[0])
    .when('type', {
      is: (value: any) => value.toLowerCase() !== 'digital',
      then: (rule) => rule.required('Arquivo obrigatório'),
      otherwise: (rule) => rule.transform(() => null),
    }),

  judgmentOfApprovalOfLaborCalculations: yup.mixed()
    .nullable()
    .transform((val: any) => val[0])
    .when('type', fileNotRequired),

  anotherRelevantParts: yup.mixed()
    .nullable()
    .transform((val: any) => val[0])
    .when('type', fileNotRequired),

  finalCertificate: yup.mixed()
    .nullable()
    .transform((val: any) => val[0])
    .when('type', fileNotRequired),

  contestation: yup.mixed()
    .nullable()
    .transform((val: any) => val[0])
    .when('type', fileNotRequired),

  resources: yup.mixed()
    .nullable()
    .transform((val: any) => val[0])
    .when('type', fileNotRequired),

  accordion: yup.mixed()
    .nullable()
    .transform((val: any) => val[0])
    .when('type', fileNotRequired),

  sentence: yup.mixed()
    .nullable()
    .transform((val: any) => val[0])
    .when('type', fileNotRequired),
});
