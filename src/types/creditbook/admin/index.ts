import { Address, AnnouncementStatus } from '..';
import { BatchParams, BatchStatus } from '../Batch';
import { ResponseListAllAnnouncements } from '../Lawsuits';

export type UpdateAnnouncementStatusParams = {
  editionRequirements?: string;
  status: AnnouncementStatus;
  announcementId: string;
};

export type UpdateBatchStatusParams = {
  editionRequirements?: string;
  status: BatchStatus;
  batchId: string;
};

interface QueryPagination {
  page?: number,
  perPage?: number,
}

export interface AnnouncementQueriesOptions {
  params: QueryPagination & {
    status: AnnouncementStatus
  }
}

export interface UserChangeStatusParams {
  userId: string,
  action: 'active' | 'deactivate',
  deactivationReason?: string,
}

export interface NewLawsuitParamsResponse {
  createdAt: string,
  processNumber: string,
  plan: string,
  id: string,
}

export interface UserParams {
  id: string,
  fullName: string,
  email: string,
  announcements: number,
  isActive: boolean,

  cellphone: string,
  type: 'person' | 'corporation',
  address: Address,
  deactivationReason: string | null,
}

export interface UsersAdminResponse {
  users: UserParams[],
  pages: number
}

export type BatchesAdminResponse = {
  batches: BatchParams[],
  pages: number
};

// Response
export type AnnouncementsAdminResponse = ResponseListAllAnnouncements<NewLawsuitParamsResponse>;
