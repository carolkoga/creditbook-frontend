import { creditbookApi } from '@api/creditbookApi';

class UserCreditbookService {
  async getUserInformation({ token }: { token: string }) {
    return await creditbookApi.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const userCreditbookService = new UserCreditbookService();
