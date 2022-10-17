import {
  AnnouncementActionPhase, AnnouncementGender, AnnouncementKind, AnnouncementTypes,
} from './AnnouncementTypes';

export interface LawsuitParams {
  mainDefendantCorporationNameOrName: string;
  mainDefendantCpjOrCnpj: string;

  mainActorCorporationNameOrName: string;
  mainActorCpfOrCnpj: string;

  processNumber: string;
  batchId?: string;

  tribunal: string;
  city: string;
  uf: string;
  processGender: keyof AnnouncementGender;
  actionPhase: keyof AnnouncementActionPhase;
  kind: keyof AnnouncementKind;

  type: keyof AnnouncementTypes | string;

  digitalProcess?: string;

  secondaryActorCpfOrCnpj?: string;
  secondaryActorCorporationNameOrName?: string;

  secondaryDefendantCpjOrCnpj?: string;
  secondaryDefendantCorporationNameOrName?: string;

  isPremium: boolean;
  isFavorite?: boolean;
  processPrice: number;
  income: number;
  pledgeOrGuarantee: boolean;
  acceptNegotiation: boolean;
  ownOrAttorney: 'own' | 'attorney';

  inicialPetition: File;
  judgmentOfApprovalOfLaborCalculations?: File;
  anotherRelevantParts?: File;
  finalCertificate?: File;
  contestation?: File;
  resources?: File;
  accordion?: File;
  sentence?: File;
  procuration?: File;

  plan: 'byMonth' | 'byPercent' | 'both',
}

export interface LawsuitParamsID extends LawsuitParams {
  id: string
  owner: string,
}

export interface NewLawsuitParams extends Omit<LawsuitParams, 'batchId' | 'pledgeOrGuarantee' | 'acceptNegotiation' | 'isFavorite' | 'isPremium'> {
  pledgeOrGuarantee: '1' | '0';
  acceptNegotiation: '1' | '0';
  isFavorite: '1' | '0';
  isPremium: '1' | '0';
}
