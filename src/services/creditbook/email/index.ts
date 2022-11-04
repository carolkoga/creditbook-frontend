import { ContactSupportParams } from '@type/creditbook';
import { HttpClient } from '../http';

class EmailServices extends HttpClient {
  async contactAnnouncer() {
    return this.httpClient.post('/suport');
  }

  async contactSupport(contactParams: ContactSupportParams) {
    return this.httpClient.post('/support', contactParams);
  }
}

export const emailServices = new EmailServices();
