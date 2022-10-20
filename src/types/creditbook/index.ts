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
  newPassword?: string | null,
  currentPassword?: string | null,
  profilePicture?: string,
}

export interface UserDefaultValues extends Omit<UserUpdateParams, 'nationality'> {
  nationality: { label: string, value: string },
}

export interface ContactAnnouncerParams {
  name: string,
  email: string,
  phone: string,
  message: string,
  type: 'batch' | 'announcement',
  creditId: string,
}
