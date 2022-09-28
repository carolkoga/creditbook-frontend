import { Direction } from '@components/Direction';
import NavigationTab from '@components/NavigationTab';
import { ReactNode } from 'react';

const routes = [
  {
    label: 'Configurações em Geral',
    link: '/in/settings',
  },

  {
    label: 'Termos de Uso',
    link: '/in/settings/terms-of-services',
  },

  {
    label: 'FAQ',
    link: '/in/settings/FAQ',
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
