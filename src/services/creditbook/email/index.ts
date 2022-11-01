import { ContactSupportParams } from '@type/creditbook';
import { HttpClient } from '../http';

class EmailServices extends HttpClient {
  async contactAnnouncer() {
    return await this.httpClient.post('/suport');
  }

  async contactSupport(contactParams: ContactSupportParams) {
    return await this.httpClient.post('/support', contactParams);
  }
}

export const emailServices = new EmailServices();
