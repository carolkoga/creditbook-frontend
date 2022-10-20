import { AnnouncementStatus } from './AnnouncementStatus';
import {
  AnnouncementActionPhase, AnnouncementGender, AnnouncementKind, AnnouncementTypes,
} from './AnnouncementTypes';

interface LawsuitFiles {
  inicialPetition: File;
  judgmentOfApprovalOfLaborCalculations?: File;
  anotherRelevantParts?: File;
  finalCertificate?: File;
  contestation?: File;
  resources?: File;
  accordion?: File;
  sentence?: File;
  procuration?: File;
}

interface Lawsuit {
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

  type: AnnouncementTypes;

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
  plan: 'byMonth' | 'byPercent' | 'both',
}

export interface LawsuitParams extends LawsuitFiles, Omit<Lawsuit, 'digitalProcess' | 'procuration'> {
 id: string,
 userId: string,
 status: AnnouncementStatus,
 digitalProcessUrl: string,
 procurationUrl: string,
}

export interface NewLawsuitParams extends Omit<Lawsuit, 'batchId' | 'pledgeOrGuarantee' | 'acceptNegotiation' | 'isFavorite' | 'isPremium'> {
  pledgeOrGuarantee: '1' | '0';
  acceptNegotiation: '1' | '0';
  isFavorite: '1' | '0';
  isPremium: '1' | '0';
}
