import { ContactAnnouncerParams, ContactSupportParams } from '@type/creditbook';
import { HttpClient } from '../http';

class EmailServices extends HttpClient {
  async contactAnnouncer(contactParams: ContactAnnouncerParams) {
    return this.httpClient.post('/contact/announcer', {
      ...contactParams,
    });
  }

  async contactSupport(contactParams: ContactSupportParams) {
    return this.httpClient.post('/support', contactParams);
  }
}

export const emailServices = new EmailServices();
