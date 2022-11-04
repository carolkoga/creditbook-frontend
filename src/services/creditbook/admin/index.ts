import { ResponseListAllAnnouncements } from '@type/creditbook/Lawsuits';
import { HttpClient } from '../http';

export enum StatusAnnouncementsAdmin {
  admin = 'admin',
}

export interface AnnouncementQueriesOptions {
  params: {
    status: StatusAnnouncementsAdmin
  }
}

export class AdminServices extends HttpClient {
  async indexAnnouncements(options?: AnnouncementQueriesOptions) {
    return this.httpClient.get<ResponseListAllAnnouncements>('/announcement', {
      params: {
        ...options?.params,
      },
    });
  }
}

export const adminServices = new AdminServices();
