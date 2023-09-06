import {
  AnnouncementQueriesOptions,
  AnnouncementsAdminResponse,
  BatchesAdminResponse,
  UpdateAnnouncementStatusParams,
  UserChangeStatusParams,
  UsersAdminResponse,
  UpdateBatchStatusParams,
} from '@type/creditbook/admin';

import { HttpClient } from '../http';

const PREFIX_ANNOUNCEMENT = '/announcement';
const PREFIX_BATCH = '/batch';
const PREFIX_USER = '/user';

export class AdminServices extends HttpClient {
  async indexAnnouncements(options?: AnnouncementQueriesOptions) {
    return this.httpClient.get<AnnouncementsAdminResponse>(`${PREFIX_ANNOUNCEMENT}/admin`, {
      params: {
        ...options?.params,
      },
    });
  }

  async indexBatches(options?: AnnouncementQueriesOptions) {
    return this.httpClient.get<BatchesAdminResponse>(`${PREFIX_BATCH}/admin`, {
      params: {
        ...options?.params,
      },
    });
  }

  async changeStatusAnnouncements(updateAnnouncement: UpdateAnnouncementStatusParams) {
    return this.httpClient.put(`${PREFIX_ANNOUNCEMENT}/status`, updateAnnouncement);
  }

  async changeStatusBatches(updateBatch: UpdateBatchStatusParams) {
    return this.httpClient.put(`${PREFIX_BATCH}/status`, updateBatch);
  }

  async deleteAnnouncementById(id: string) {
    return this.httpClient.delete(`${PREFIX_ANNOUNCEMENT}/${id}`);
  }

  async deleteBatchById(id: string) {
    return this.httpClient.delete(`${PREFIX_BATCH}/admin/${id}`);
  }

  async indexUsers(params?: { page?: number }) {
    return this.httpClient.get<UsersAdminResponse>(`${PREFIX_USER}/all`, {
      params: {
        ...params,
        page: params?.page ?? 1,
      },
    });
  }

  async changeStatusUser({ userId, action, deactivationReason }: UserChangeStatusParams) {
    return this.httpClient.patch(`${PREFIX_USER}/status`, {
      userId, action, deactivationReason,
    });
  }
}

export const adminServices = new AdminServices();
