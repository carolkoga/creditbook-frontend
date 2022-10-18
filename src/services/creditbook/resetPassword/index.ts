import { AxiosInstance } from 'axios';
import { HttpClient } from '../http/index';

interface ResetPasswordParams {
  token: string,
  newPassword: string,
  newPasswordConfirmation: string,
}

const USER_PREFIX = '/user';

class ResetPasswordService extends HttpClient {
  constructor(api?: AxiosInstance) {
    super();
    if (api) {
      this.httpClient = api;
    }
  }

  async verifyCredentials({ email }: { email: string }) {
    return this.httpClient.post(`${USER_PREFIX}/request-reset-password`, email);
  }

  async resetPassword(data: ResetPasswordParams) {
    return this.httpClient.post(`${USER_PREFIX}/request-reset-password`, data);
  }
}

export const resetPasswordService = new ResetPasswordService();
