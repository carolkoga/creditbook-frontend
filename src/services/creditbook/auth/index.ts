import { LoginParams } from '@type/creditbook/auth/login';
import { creditbookApi } from '@api/creditbookApi';
import { AccountCorporation, AccountPerson } from '@type/creditbook/auth/register';
import { registerUseCase } from './usecases/register/registerUseCase';

class AuthCreditBookService {
  async register(data: AccountCorporation | AccountPerson) {
    const dataParsed = registerUseCase.handle(data);

    return creditbookApi.post('/auth/registration', dataParsed, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }

  async login({ email, password, role }: LoginParams) {
    const data = { password, email, role: role || 'user' };
    return creditbookApi.post('/auth/login', data);
  }

  async multipleLogin({ email, password }: Omit<LoginParams, 'role'>) {
    const data = { password, email };

    const [user, admin] = await Promise.allSettled([
      creditbookApi.post('/auth/login', { ...data, role: 'user' }),
      creditbookApi.post('/auth/login', { ...data, role: 'admin' }),
    ]);

    if (user.status === 'fulfilled') {
      return user.value;
    } if (admin.status === 'fulfilled') {
      return admin.value;
    }

    if (user.status === 'rejected') {
      throw user.reason;
    } if (admin.status === 'rejected') {
      throw admin.reason;
    }
  }
}

export const authCreditBookService = new AuthCreditBookService();
