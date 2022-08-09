import type { ILawSuits } from '@type/index';

interface AllAccess {
  admin: 'admin',
  logged: 'logged',
  'not logged': 'not logged'
}

type TAdmin = {
  access: AllAccess['admin'],
  onToggleFavorite: Function,
};

type TLogged = {
  access: AllAccess['logged'],
  onToggleFavorite: Function,
};

type TNotLogged = {
  access: AllAccess['not logged'],
};

export type LawsuitCardProps = {
  lawsuit: ILawSuits
} & (TAdmin | TLogged | TNotLogged);

export type LawsuitCardListProps = {
  lawsuits: ILawSuits[]
} & (Pick<TAdmin, 'access'> | Pick<TLogged, 'access'> | Pick<TNotLogged, 'access'>);
