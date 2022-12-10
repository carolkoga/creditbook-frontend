import { OptionType } from '@components/Select';
import { AccountTypes } from '@type/creditbook';
import { LoginParams } from '@type/creditbook/auth/login';
import { RegistrationParams } from '@type/creditbook/auth/register';
import { creditbookApi } from '@api/creditbookApi';

class AuthCreditBookService {
  async register<T extends AccountTypes = 'person'>(data: RegistrationParams<T>) {
    const formData = new FormData();
    Object.entries(data).forEach((field) => {
      const [key, value] = field;
      if (key === 'address') {
        return formData.append(key, JSON.stringify(value));
      }

      if (key === 'nationality') {
        const nationalityValue = value as OptionType;
        return formData.append(key, nationalityValue.value);
      }

      if (key === 'bornDate') {
        const date = new Date((value as string));

        return formData.append(key, date.toISOString());
      }

      if (key === 'profilePicture') {
        const profilePictureIsFile = value as File[] || File;

        // @ts-ignore
        if (typeof profilePictureIsFile === 'function') {
          // @ts-ignore
          if (profilePictureIsFile.length as File[]) {
            return;
          }
        }

        // @ts-ignore
        if (!profilePictureIsFile?.name) {
          return;
        }
      }

      formData.append(key, (value as string | Blob));
    });

    const dataParsed: any[] = [];

    formData.forEach((itemValue, keyItem) => dataParsed.push({ [keyItem]: itemValue }));

    return creditbookApi.post('/auth/registration', formData, {
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
      return user.reason;
    } if (admin.status === 'rejected') {
      return admin.reason;
    }
  }
}

export const authCreditBookService = new AuthCreditBookService();
