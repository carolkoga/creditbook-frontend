import { ReactNode } from 'react';

import LandingPageHeader from '@components/LadingPageHeader';
import Footer from '@components/Footer';
import { Main } from '@styles/index';

interface IProps {
  children: ReactNode;
}

export default function LayoutNotLogged({ children }: IProps) {
  return (
    <>
      <LandingPageHeader />
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  );
}
