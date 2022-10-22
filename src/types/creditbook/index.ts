import { AnnouncementActionPhase, AnnouncementGender, AnnouncementKind } from '@type/creditbook/Lawsuits/AnnouncementTypes';
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

export interface PersonSearchParams {
  corporationNameOrName?: string;
  cpfOrcnpj?: string
}

export interface QueriesToIndexAnnouncements {
  params: {
    personType?: 'person' | 'corporation';
    type?: 'single' | 'batch';

    batchId?: string;

    page?: number;
    perPage?: number;

    actionPhase?: keyof AnnouncementActionPhase;
    processGender?: keyof AnnouncementGender;
    kind?: keyof AnnouncementKind;

    processNumber?: string;
    tribunal?: string;
    city?: string;
    uf?: string;

    minPrice?: number;
    maxPrice?: number;

    actors?: PersonSearchParams[];

    defendants?: PersonSearchParams[];

    isPremium?: boolean;
    isFavorite?: boolean;
  }
}
