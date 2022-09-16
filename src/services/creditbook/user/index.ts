import { creditbookApi } from '@api/creditbookApi';

class UserCreditbookService {
  async getUserInformation({ token }: { token: string }) {
    return await creditbookApi.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async update(data: any) {
    return await creditbookApi.patch('/user', data);
  }
}

export const userCreditbookService = new UserCreditbookService();
