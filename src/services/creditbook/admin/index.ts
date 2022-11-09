import {
  AnnouncementQueriesOptions,
  AnnouncementsAdminResponse,
  UpdateAnnouncementStatusParams,
  UserChangeStatusParams,
  UserParams,
} from '@type/creditbook/admin';

import { HttpClient } from '../http';

const PREFIX_ANNOUNCEMENT = '/announcement';
const PREFIX_USER = '/user';

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
    return this.httpClient.get<UserParams[]>(`${PREFIX_USER}/all`);
  }

  async changeStatusUser({ userId, action, deactivationReason }: UserChangeStatusParams) {
    return this.httpClient.patch(`${PREFIX_USER}/status`, {
      userId, action, deactivationReason,
    });
  }
}

export const adminServices = new AdminServices();
