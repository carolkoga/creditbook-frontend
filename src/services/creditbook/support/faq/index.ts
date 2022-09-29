import { creditbookApi } from '@api/creditbookApi';
import { AxiosInstance } from 'axios';

export class FaqService {
  private httpClient: AxiosInstance;

  constructor(customAPI?: AxiosInstance) {
    this.httpClient = !customAPI
      ? creditbookApi
      : customAPI;
  }

  listAllFAQs() {
    return this.httpClient.get('/faq');
  }

  storeFAQ(data: any) {
    return this.httpClient.post('/faq', data);
  }

  update(data: any, userId: string) {
    return this.httpClient.patch(`/faq/${userId}`, data);
  }

  delete(userId: string) {
    return this.httpClient.delete(`/faq/${userId}`);
  }
}

export const FAQService = new FaqService();
