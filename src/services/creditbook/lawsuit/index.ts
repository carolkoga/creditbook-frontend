/* eslint-disable default-param-last */
import { QueriesToIndexAnnouncements } from '@type/creditbook';
import { ResponseListAllAnnouncements } from '@type/creditbook/Lawsuits';
import { AxiosInstance } from 'axios';
import { LawsuitParams } from '../../../types/creditbook/Lawsuits/index';
import { HttpClient } from '../http';

export class LawsuitService extends HttpClient {
  private customHeaders: object;

  constructor(api?: AxiosInstance) {
    super(api);

    this.customHeaders = {
      'content-type': 'multipart/form-data',
    };
  }

  async listAll(options?: QueriesToIndexAnnouncements) {
    return this.httpClient.get<ResponseListAllAnnouncements>('/announcement', {
      params: {
        ...options?.params,
      },
    });
  }

  async listAnnouncementsUser() {
    return this.httpClient.get<LawsuitParams[]>('/announcement/user');
  }

  async createLawsuit(data: any) {
    const formData = this._convertToFormData(data);

    return this.httpClient.post('/announcement', formData, {
      headers: { ...this.customHeaders },
    });
  }

  async update(data: any, currentData: any) {
    const formData = this._convertToFormData(data, 'update', currentData);

    return this.httpClient.patch('/announcement', formData, {
      headers: { ...this.customHeaders },
    });
  }

  async changeFavorite({ id, isFavorite }: { id: string, isFavorite: '1' | '0' }) {
    const formData = this._convertToFormData({ isFavorite, announcementId: id });

    return this.httpClient.patch('/announcement', formData, {
      headers: { ...this.customHeaders },
    });
  }

  async changeBatch({ id, batchId }: { id: string, batchId: string }) {
    const formData = this._convertToFormData({ batchId, announcementId: id });

    return this.httpClient.patch('/announcement', formData, {
      headers: { ...this.customHeaders },
    });
  }

  async getById(id: string) {
    return this.httpClient.get(`/announcement/${id}`);
  }

  private _convertToFormData(
    newData: any,
    type?: 'new' | 'update',
    currentData?: any,
  ) {
    const formData = new FormData();

    if (type === 'update') {
      Object.entries(newData).forEach((field) => {
        const [key, value] = field;

        if (key === 'digitalProcess') {
          if (currentData.digitalProcessUrl === value) return;
        }

        if (key === 'pledgeOrGuarantee' || key === 'acceptNegotiation' || key === 'isFavorite' || key === 'isPremium') {
          if (currentData[key] === !!Number(value)) return;
        }

        if (key === 'id') {
          return formData.append('announcementId', value as string);
        }

        if (currentData[key] === value) return;

        if (key === 'files') return;

        formData.append(key, (value as string | Blob));
      });

      return formData;
    }

    Object.entries(newData).forEach((field) => {
      const [key, value] = field;
      if (key === 'files') return;
      if (!value) return;

      formData.append(key, (value as string | Blob));
    });

    return formData;
  }
}

export const lawsuitService = new LawsuitService();
