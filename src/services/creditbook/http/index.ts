import { creditbookApi } from '@api/creditbookApi';
import { AxiosInstance } from 'axios';

export class HttpClient {
  public httpClient: AxiosInstance;

  constructor(customAPI?: AxiosInstance) {
    this.httpClient = !customAPI
      ? creditbookApi
      : customAPI;
  }
}
