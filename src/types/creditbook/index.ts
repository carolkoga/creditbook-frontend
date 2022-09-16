import { AccountCommonParams } from './auth/register';

export type AccountTypes = 'person' | 'corporation';

export type Address = {
  cep: string,
  uf: string,
  number: string,
  complement: string,
  address: string,
  city: string,
};

export interface UserUpdateParams extends Omit<AccountCommonParams, 'passwordConfirmation' | 'password' | 'profilePicture'> {
  userId: string,
  newPassoword?: string,
  currentPassword?: string,
  profilePicture?: string,
}

export interface UserDefaultValues extends Omit<UserUpdateParams, 'nationality'> {
  nationality: { label: string, value: string },
}
