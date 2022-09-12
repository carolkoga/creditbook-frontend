import { Direction } from '@components/Direction';
import { ReactNode } from 'react';
import Navigation from './navigation';

export default function WrapperSupport({ children }: { children: ReactNode }) {
  return (
    <Direction>
      <Navigation />
      {children}
    </Direction>
  );
}
