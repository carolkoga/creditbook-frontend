import { FileTranslationTypes } from '@utils/translation/announcement/fileTranslation';
import { PaymentParams } from '../payment';
import { AnnouncementStatus } from './AnnouncementStatus';

import {
  AnnouncementActionPhase, AnnouncementGender, AnnouncementKind, AnnouncementTypes,
} from './AnnouncementTypes';

interface LawsuitFiles {
  initialPetition: File;
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
  mainDefendantCpfOrCnpj: string;

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

  secondaryDefendantCpfOrCnpj?: string;
  secondaryDefendantCorporationNameOrName?: string;

  isPremium: boolean;
  isFavorite?: boolean;
  processPrice: number;
  income: number;
  pledgeOrGuarantee: boolean;
  acceptNegotiation: boolean;
  ownOrAttorney: 'own' | 'attorney';
  plan: 'byMonth' | 'byPercent' | 'both',
  paymentMethodId: string;
}

export interface LawsuitParams extends Omit<Lawsuit, 'digitalProcess' | 'procuration'> {
  id: string,
  userId: string,
  status: AnnouncementStatus,
  digitalProcessUrl: string,
  overSixMonths: boolean,
  procurationUrl: string,
  paymentMethod?: PaymentParams,
  paymentFailed?: boolean,
  batch?: {
    id: string,
    name: string
  },
  files: {
    name: keyof FileTranslationTypes,
    url: string,
  }[]
}

export interface NewLawsuitParams extends LawsuitFiles, Omit<Lawsuit, 'batchId' | 'pledgeOrGuarantee' | 'acceptNegotiation' | 'isFavorite' | 'isPremium'> {
  pledgeOrGuarantee: '1' | '0';
  acceptNegotiation: '1' | '0';
  isFavorite: '1' | '0';
  isPremium: '1' | '0';
}

export interface UpdateLawsuitParams extends NewLawsuitParams {
  initialPetitionUrl?: string | null;
  judgmentOfApprovalOfLaborCalculationsUrl?: string | null;
  anotherRelevantPartsUrl?: string | null;
  finalCertificateUrl?: string | null;
  contestationUrl?: string | null;
  resourcesUrl?: string | null;
  accordionUrl?: string | null;
  sentenceUrl?: string | null;
  procurationUrl?: string | null;
}

export interface ResponseListAllAnnouncements<NewType = 'undefined'> {
  pages: number,
  announcements: NewType extends 'undefined' ? LawsuitParams[] : NewType[],
}

export interface AnnouncementPlanType {
  id: string;
  processNumber: string;
  plan: string;
  premium: string;
  type: 'batch' | 'announcement';
}
