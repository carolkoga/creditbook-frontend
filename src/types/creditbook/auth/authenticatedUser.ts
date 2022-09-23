import { LoginParams } from './login';
import { AccountCorporation, AccountPerson } from './register';

type PersonAccountMainInformation = Omit<AccountPerson, 'profilePicture' | 'passwordConfirmation'> & {
  type: 'person'
}

type CorporationAccountMainInformation = Omit<AccountCorporation, 'profilePicture' | 'passwordConfirmation'> & {
  type: 'corporation'
}

type UnionAccountType = PersonAccountMainInformation | CorporationAccountMainInformation;

export type AuthenticatedUserData = Omit<UnionAccountType, 'password'> & {
  id: string,
  profilePictureKey: string,
  profilePictureUrl: string,
}

export interface AuthContextType {
  token: string,
  isAuthenticated: boolean,
  user: AuthenticatedUserData,
  // eslint-disable-next-line no-unused-vars
  handleSignIn: (data: LoginParams) => Promise<void>
  handleSignOut: () => void,
  // eslint-disable-next-line no-unused-vars
  handleUpdateUser: (data: AuthenticatedUserData) => void,
}
