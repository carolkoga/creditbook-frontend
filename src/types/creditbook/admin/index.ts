import { Address, AnnouncementStatus } from '..';
import { ResponseListAllAnnouncements } from '../Lawsuits';

export type UpdateAnnouncementStatusParams = {
  editionRequirements?: string;
  status: AnnouncementStatus;
  announcementId: string;
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

// Response
export type AnnouncementsAdminResponse = ResponseListAllAnnouncements<NewLawsuitParamsResponse>;
