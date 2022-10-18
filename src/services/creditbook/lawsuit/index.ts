import { AxiosInstance } from 'axios';
import { HttpClient } from '../http';

class LawsuitService extends HttpClient {
  private customHeaders: object;

  constructor(api?: AxiosInstance) {
    super(api);

    this.customHeaders = {
      'content-type': 'multipart/form-data',
    };
  }

  async createLawsuit(data: any) {
    const formData = this._convertToFormData(data);

    return await this.httpClient.post('/announcement', formData, {
      headers: { ...this.customHeaders },
    });
  }

  async changeFavorite(isFavorite: '1' | '0') {
    const formData = this._convertToFormData({ isFavorite });

    return await this.httpClient.post('/announcement', formData, {
      headers: { ...this.customHeaders },
    });
  }

  private _convertToFormData(data: any) {
    const formData = new FormData();

    Object.entries(data).forEach((field) => {
      const [key, value] = field;

      formData.append(key, (value as string | Blob));
    });

    return formData;
  }
}

export const lawsuitService = new LawsuitService();
