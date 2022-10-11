import { creditbookApi } from '@api/creditbookApi';

class UserCreditbookService {
  async getUserInformation({ token }: { token: string }) {
    return await creditbookApi.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async update(data: any, originalData: any) {
    const formData = new FormData();
    Object.entries(data).forEach((field) => {
      const [key, value] = field;
      if (key === 'profilePictureKey' || key === 'profilePictureUrl') {
        const profilePictureKey = value;
        if (typeof profilePictureKey === 'string') {
          return;
        }
      }

      if (key === 'id' || key === 'userId') return;

      if (key === 'currentPassword') {
        if (!value) return;
      }

      if (key === 'newPassword') {
        if (!value) return;
      }

      if (originalData[key] === value) return;

      formData.append(key, (value as string | Blob));
    });

    const dataParsed: any[] = [];

    formData.forEach((itemValue, keyItem) => dataParsed.push({ [keyItem]: itemValue }));

    return await creditbookApi.patch('/user', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }
}

export const userCreditbookService = new UserCreditbookService();
