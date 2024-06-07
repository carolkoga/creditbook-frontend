export interface FileTranslationTypes {
  initialPetitionUrl: string;
  sentenceUrl: string;
  accordionUrl: string;
  resourcesUrl: string;
  procurationUrl: string;
  contestationUrl: string;
  finalCertificateUrl: string;
  anotherRelevantPartsUrl: string;
  judgmentOfApprovalOfLaborCalculationsUrl: string;
}

export const fileTranslation: FileTranslationTypes = {
  initialPetitionUrl: 'Petição Inicial',
  sentenceUrl: 'Setença',
  accordionUrl: 'Acordão',
  resourcesUrl: 'Recursos',
  procurationUrl: 'Procuração',
  contestationUrl: 'Contestação',
  finalCertificateUrl: 'Cert. transitado em julgado',
  anotherRelevantPartsUrl: 'Outras peças relevantes',
  judgmentOfApprovalOfLaborCalculationsUrl:
    'Sentença de homologação de cálculos trab...',
};
