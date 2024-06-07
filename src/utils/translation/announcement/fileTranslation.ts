export interface FileTranslationTypes {
  initialPetitionUrl: string;
  sentenceUrl: string;
  accordionUrl: string;
  resourcesUrl: string;
  procurationUrl: string;
  contestationUrl: string;
  finalCertificateUrl: string;
  anotherRelevantParts: string;
  judgmentOfApprovalOfLaborCalculationsUrl: string;
}

export const fileTranslation: FileTranslationTypes = {
  initialPetitionUrl: 'Petição Inicial',
  sentenceUrl: 'Sentença',
  accordionUrl: 'Acordão',
  resourcesUrl: 'Recursos',
  procurationUrl: 'Procuração',
  contestationUrl: 'Contestação',
  finalCertificateUrl: 'Cert. transitado em julgado',
  anotherRelevantParts: 'Outras peças relevantes',
  judgmentOfApprovalOfLaborCalculationsUrl:
    'Sentença de homologação de cálculos trab...',
};
