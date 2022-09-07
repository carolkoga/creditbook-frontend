import { OptionType } from '@components/Select';
import { creditbookApi } from '@services/api/creditbookApi';
import { RegistrationParams, AccountTypes } from './types';

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

        return formData.append(key, date.toString());
      }

      if (key === 'profilePicture') {
        const profilePictureIsFileList = value as FileList;
        if (profilePictureIsFileList.length) {
          return;
        }
      }
      formData.append(key, (value as string | Blob));
    });

    const dataParsed: any[] = [];

    formData.forEach((itemValue, keyItem) => dataParsed.push({ [keyItem]: itemValue }));
    console.log({ dataParsed });

    return await creditbookApi.post('/auth/registration', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }
}

export default new AuthCreditBookService();
