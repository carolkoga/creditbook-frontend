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

  update(data: any) {
    return this.httpClient.patch('/faq', data);
  }
}

export const FAQService = new FaqService();
