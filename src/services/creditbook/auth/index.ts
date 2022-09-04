import { OptionType } from '@components/Select';
import { creditbookApi } from '@services/api/creditbookApi';
import { AccountTypes } from './types';

class AuthCreditBookService {
  async register(data: any, accountType: AccountTypes) {
    const formData = new FormData();
    formData.append('type', accountType);
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

        return formData.append(key, date.toString());
      }

      if (key === 'profilePicture') {
        const profilePictureIsFileList = value as FileList;
        if (!profilePictureIsFileList.length) {
          return formData.append(key, '');
        }
      }
      formData.append(key, (value as string | Blob));
    });

    return await creditbookApi.post('/auth/registration', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }
}

export default new AuthCreditBookService();
