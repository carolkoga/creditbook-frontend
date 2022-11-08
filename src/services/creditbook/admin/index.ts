import { ResponseListAllAnnouncements } from '@type/creditbook/Lawsuits';
import { HttpClient } from '../http';

export enum StatusAnnouncementsAdmin {
  admin = 'admin',
}

export type AnnouncementStatus = (
  | 'accepted'
  | 'deleted'
  | 'rejected'
  | 'pending'
  | 'inactive'
  | 'edition_requested'
);

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

interface UserChangeStatusParams {
  userId: string,
  action: 'active' | 'deactivate',
  deactivationReason?: string,
}

const PREFIX_ANNOUNCEMENT = '/announcement';
const PREFIX_USER = '/user';

export interface NewLawsuitParamsResponse {
  createdAt: string,
  processNumber: string,
  plan: string,
  id: string,
}

export type AnnouncementsAdminResponse = ResponseListAllAnnouncements<NewLawsuitParamsResponse>;

export class AdminServices extends HttpClient {
  async indexAnnouncements(options?: AnnouncementQueriesOptions) {
    return this.httpClient.get<AnnouncementsAdminResponse>(`${PREFIX_ANNOUNCEMENT}/admin`, {
      params: {
        ...options?.params,
      },
    });
  }

  async changeStatusAnnouncements(updateAnnouncement: UpdateAnnouncementStatusParams) {
    return this.httpClient.put(`${PREFIX_ANNOUNCEMENT}/status`, updateAnnouncement);
  }

  async deleteAnnouncementById(id: string) {
    return this.httpClient.delete(`${PREFIX_ANNOUNCEMENT}/${id}`);
  }

  async indexUsers() {
    return this.httpClient.get(`${PREFIX_USER}/all`);
  }

  async changeStatusUser({ userId, action, deactivationReason }: UserChangeStatusParams) {
    return this.httpClient.post(`${PREFIX_USER}/status`, {
      userId, action, deactivationReason,
    });
  }
}

export const adminServices = new AdminServices();
