import useAuth from 'hooks/useAuth';
import { ReactNode } from 'react';
import LayoutLogged from './Logged';
import LayoutNotLogged from './NotLogged';

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && (
        <LayoutLogged>
          {children}
        </LayoutLogged>
      )}

      {!isAuthenticated && (
        <LayoutNotLogged>
          {children}
        </LayoutNotLogged>
      )}
    </>
  );
}
