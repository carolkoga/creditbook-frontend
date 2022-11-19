import { Direction } from '@components/Direction';
import NavigationTab from '@components/NavigationTab';
import { ReactNode } from 'react';

const PREFIX = '/in/settings';

const routes = [
  {
    label: 'Configurações em Geral',
    link: PREFIX,
  },

  {
    label: 'Cartões',
    link: `${PREFIX}/credit-card`,
  },

  {
    label: 'Meus Planos',
    link: `${PREFIX}/my-plans`,
  },
];

export function StructureSettings({ children }: { children: ReactNode }) {
  return (
    <>
      <Direction>
        <NavigationTab routes={routes} />
      </Direction>
      {children}
    </>
  );
}
