import { PaginationLawsuitProps } from '@components/LawsuitCard/types/Props';
import { AnnouncementActionPhase, AnnouncementGender, AnnouncementKind } from '@type/creditbook/Lawsuits/AnnouncementTypes';
import { AccountCommonParams } from './auth/register';
import { LawsuitParams } from './Lawsuits';

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
  userId: string,
  phone: string,
  message: string,
  type: 'batch' | 'announcement',
  creditId: string,
  name: string,
}

export interface ContactSupportParams extends Omit<ContactAnnouncerParams, 'userId' | 'type' | 'creditId'> {
  subject: string,
  email: string,
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
    userId?: string;

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

    orderBy?: {
      isPremium?: boolean,
    }
  }
}

export interface CustomResponseAnnouncements {
  result: LawsuitParams[],
  pagination: PaginationLawsuitProps
}

export type AnnouncementStatus = (
  | 'accepted'
  | 'deleted'
  | 'rejected'
  | 'pending'
  | 'inactive'
  | 'edition_requested'
  | 'payment_failed'
);

export type UFBrazilType = (
  | 'RO'
  | 'AC'
  | 'AM'
  | 'RR'
  | 'TO'
  | 'MA'
  | 'PI'
  | 'CE'
  | 'RN'
  | 'PB'
  | 'PE'
  | 'AL'
  | 'SE'
  | 'BA'
  | 'MG'
  | 'ES'
  | 'RJ'
  | 'SP'
  | 'PR'
  | 'SC'
  | 'RS'
  | 'MS'
  | 'MT'
  | 'GO'
  | 'DF'
);
