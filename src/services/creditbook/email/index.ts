import { HttpClient } from '../http';

class EmailServices extends HttpClient {
  async contactAnnouncer() {
    return await this.httpClient.post('/contact/announcer');
  }

  async contactSupport() {
    return await this.httpClient.post('/contact/support');
  }
}

export const emailServices = new EmailServices();
