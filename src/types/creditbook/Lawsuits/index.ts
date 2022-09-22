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
  processGender: AnnouncementGender;
  actionPhase: AnnouncementActionPhase;
  kind: AnnouncementKind;

  type: AnnouncementTypes;

  digitalProcess?: string;

  secondaryActorCpfOrCnpj?: string;
  secondaryActorCorporationNameOrName?: string;

  secondaryDefendantCpjOrCnpj?: string;
  secondaryDefendantCorporationNameOrName?: string;

  inicialPetition: File;
  judgmentOfApprovalOfLaborCalculations?: File;
  anotherRelevantParts?: File;
  finalCertificate?: File;
  contestation?: File;
  resources?: File;
  accordion?: File;
  sentence?: File;
}
