import { StructureDirection } from '@components/StructureDirection';
import { ReactNode } from 'react';
import Navigation from './navigation';

export default function WrapperSupport({ children }: { children: ReactNode }) {
  return (
    <StructureDirection>
      <Navigation />
      {children}
    </StructureDirection>
  );
}
