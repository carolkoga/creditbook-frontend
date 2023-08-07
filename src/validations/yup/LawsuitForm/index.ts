import { mapperCurrency } from '@utils/mapperCurrency';
import { MixedSchema } from 'yup/lib/mixed';
import { validateUF } from 'validations-br';
import * as yup from 'yup';
import { StringSchema } from 'yup';

const fileNotRequired = {
  is: (value: any) => value.toLowerCase() !== 'digital',
  then: (rule: MixedSchema) => rule.notRequired(),
  otherwise: (rule: MixedSchema) => rule.transform(() => null),
};

const fileNotRequiredWithUrl = {
  is: (type: 'digital' | 'physical', urlName: string | undefined) => {
    if (urlName) {
      if (type === 'physical') {
        return false;
      }
    }
  },
  then: (rule: MixedSchema) => rule.notRequired(),
};

const isAlreadySetIdentificationNumber = (
  personIdentification: any,
  schema: StringSchema | any,
) => {
  if (!personIdentification) return;

  return schema.test({
    name: 'cpf or cnpj already set in this announcement',
    message: 'O CPF/CNPJ já foi inserido nesse documento',
    test: (value: any) => value !== personIdentification,
  });
};

export const newLawsuitSchemaValidation = yup.object().shape({
  processNumber: yup.string()
    .required('Campo obrigatório')
    .test('process number invalid', 'Número do processo inválido', (val: any) => val?.length > 17),
  type: yup.string().oneOf(['digital', 'physical']).required(),
  uf: yup.mixed()
    .required('Escolha um estado')
    .test('uf', 'Digite um UF válido', (val: any) => validateUF(val))
    .transform((val: any) => val.value),

  plan: yup.string().required(),
  paymentMethodId: yup
    .mixed()
    .nullable()
    .when('plan', {
      is: (plan?: 'byPercent' | 'byMonth' | 'both' | 'batch') => plan !== 'batch' && plan !== 'byPercent',
      then: (rule) => rule.required(),
    })
    .when('isPremium', {
      is: (isPremium: '1' | '0') => isPremium === '1',
      then: (rule) => rule.required(),
    }),

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
    .notRequired()
    .when('mainActorCpfOrCnpj', isAlreadySetIdentificationNumber),

  mainDefendantCorporationNameOrName: yup.string().required('Campo obrigatório'),
  mainDefendantCpfOrCnpj: yup.string()
    .required('Campo obrigatório')
    .cpfOrcnpj()
    .when('mainActorCpfOrCnpj', isAlreadySetIdentificationNumber),

  secondaryDefendantCorporationNameOrName: yup.string().nullable().notRequired(),
  secondaryDefendantCpfOrCnpj: yup.string()
    .nullable()
    .when({
      is: (val: any) => val,
      then: (rule) => rule.cpfOrcnpj(),
    })
    .notRequired()
    .when('mainDefendantCpfOrCnpj', isAlreadySetIdentificationNumber),

  digitalProcess: yup.string()
    .nullable()
    .when('type', {
      is: (value: any) => value.toLowerCase() === 'digital',
      then: (rule) => rule.url('Digite uma URL válida').required('Campo Obrigatório'),
      otherwise: (rule) => rule.transform(() => null),
    }),

  acceptNegotiation: yup.string(),
  ownOrAttorney: yup.string(),
  pledgeOrGuarantee: yup.string(),
  processPrice: yup.mixed()
    .transform((value) => mapperCurrency(value))
    .test({
      name: 'Income need to be higher than one hundred',
      message: 'Valor precisa ser maior que R$ 199,00',
      test: (value: any) => (typeof value !== 'undefined' ? mapperCurrency(value) > 199 : true),
    })
    .required(),

  income: yup.mixed()
    .nullable()
    .when('processPrice', (processPrice, schema: StringSchema | any) => {
      if (!processPrice) return;

      const processPriceParsed = mapperCurrency(processPrice);

      if (processPriceParsed) {
        return schema.test({
          name: 'Income can not be higher than process price',
          message: 'O preço de venda não pode ser maior que valor do processo',
          test: (value: any) => {
            const incomeParsed = mapperCurrency(value);

            return incomeParsed < processPriceParsed;
          },
        });
      }
    })
    .transform((value) => mapperCurrency(value))
    .test({
      name: 'Income need to be higher than one hundred',
      message: 'Valor precisa ser maior que R$ 100,00',
      test: (value: any) => (value === 100 || value > 100),
    })
    .required(),

  // Files
  initialPetition: yup.mixed()
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

  procuration: yup.mixed()
    .nullable()
    .transform((val: any) => val[0])
    .when('ownOrAttorney', {
      is: (value: any) => value.toLowerCase() === 'attorney',
      then: (rule: MixedSchema) => rule.required(),
      otherwise: (rule: MixedSchema) => rule.transform(() => null),
    }),
});

export const updateLawsuitSchemaValidation = yup.object()
  .concat(newLawsuitSchemaValidation)
  .shape({
    initialPetitionUrl: yup.string(),
    initialPetition: yup.mixed()
      .nullable()
      .transform((val: any) => val[0])
      .when(['type', 'initialPetitionUrl'], {
        is: (type: 'digital' | 'physical', initialPetitionUrl: string) => {
          if (!initialPetitionUrl) {
            if (type === 'physical') {
              return true;
            }
          } else {
            return false;
          }
        },
        then: (schema: MixedSchema) => schema.notRequired(),
      }),

    judgmentOfApprovalOfLaborCalculationsUrl: yup.string(),
    judgmentOfApprovalOfLaborCalculations: yup.mixed()
      .nullable()
      .transform((val: any) => val[0])
      .when(['type', 'judgmentOfApprovalOfLaborCalculationsUrl'], fileNotRequiredWithUrl),

    anotherRelevantPartsUrl: yup.string(),
    anotherRelevantParts: yup.mixed()
      .nullable()
      .transform((val: any) => val[0])
      .when(['type', 'anotherRelevantPartsUrl'], fileNotRequiredWithUrl),

    finalCertificateUrl: yup.string(),
    finalCertificate: yup.mixed()
      .nullable()
      .transform((val: any) => val[0])
      .when(['type', 'finalCertificateUrl'], fileNotRequiredWithUrl),

    contestationUrl: yup.string(),
    contestation: yup.mixed()
      .nullable()
      .transform((val: any) => val[0])
      .when(['type', 'contestationUrl'], fileNotRequiredWithUrl),

    resourcesUrl: yup.string(),
    resources: yup.mixed()
      .nullable()
      .transform((val: any) => val[0])
      .when(['type', 'resourcesUrl'], fileNotRequiredWithUrl),

    accordionUrl: yup.string(),
    accordion: yup.mixed()
      .nullable()
      .transform((val: any) => val[0])
      .when(['type', 'accordionUrl'], fileNotRequiredWithUrl),

    sentenceUrl: yup.string(),
    sentence: yup.mixed()
      .nullable()
      .transform((val: any) => val[0])
      .when(['type', 'sentenceUrl'], fileNotRequiredWithUrl),

    procurationUrl: yup.string(),
    procuration: yup.mixed()
      .nullable()
      .transform((val: any) => val[0])
      .when(['ownOrAttorney', 'procurationUrl'], {
        is: (ownOrAttorney: 'own' | 'attorney', procurationUrl: string) => {
          if (!procurationUrl) {
            if (ownOrAttorney === 'attorney') {
              return true;
            }
          } else {
            return false;
          }
        },
        then: (rule: MixedSchema) => rule.required(),
        otherwise: (rule: MixedSchema) => rule.transform(() => null),
      }),
  });
