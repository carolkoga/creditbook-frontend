import { Direction } from '@components/Direction';
import NavigationTab from '@components/NavigationTab';
import { ReactNode } from 'react';
import { routesInSupport } from './routes';

export default function WrapperSupport({ children }: { children: ReactNode }) {
  return (
    <Direction>
      <NavigationTab routes={routesInSupport} />
      {children}
    </Direction>
  );
}
