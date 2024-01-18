import { OptionType } from '@components/Select';
import { AccountCorporation, AccountPerson } from '@type/creditbook/auth/register';

// function validateURL(url: string) {
//   try {
//     const isValid = new URL(url);
//     return !!isValid;
//   } catch {
//     return false;
//   }
// }

class RegisterUseCase {
  handle(data: AccountCorporation | AccountPerson) {
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

      if (key === 'profilePictureKey' || key === 'profilePictureUrl' || key === 'profilePicture') {
        const profilePictureValue = value;

        if (!profilePictureValue) return;

        if (typeof profilePictureValue === 'string') {
          return;
        }
      }

      // if (key === 'profilePicture') {
      //   if (typeof value === 'string' && !(validateURL(value))) return;

      //   const profilePictureIsFile = value as File[];

      //   if (profilePictureIsFile?.length >= 0) {
      //     return;
      //   }

      //   // @ts-ignore
      //   if (profilePictureIsFile?.name as File) return;
      // }

      if (key === 'socialContract') {
        if (typeof value === 'string') return;

        const socialContractIsFile = value as File[];

        if (socialContractIsFile?.length >= 0) {
          return;
        }
      }

      formData.append(key, (value as string | Blob));
    });

    return formData;
  }
}

export const registerUseCase = new RegisterUseCase();
