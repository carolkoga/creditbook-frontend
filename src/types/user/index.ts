import { creditbookApi } from '@api/creditbookApi';
import { updateUseCase } from './usecase/updateUseCase';

class UserCreditbookService {
  async getUserInformation({ token }: { token: string }) {
    return creditbookApi.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async update(data: any, originalData: any) {
    const dataParsed = updateUseCase.handle(data, originalData);

    return creditbookApi.patch('/user', dataParsed, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }

  async verifyEmailInUse(email: string) {
    return creditbookApi.get(`/email-in-use?email=${email}`);
  }
}

export const userCreditbookService = new UserCreditbookService();
