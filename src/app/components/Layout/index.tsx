import { ReactNode } from 'react';
import LayoutLogged from './Logged';
import LayoutNotLogged from './NotLogged';

interface IProps {
  children: ReactNode;
}
const isLogged = true;
export default function Layout({ children }: IProps) {
  return (
    <>
      {isLogged && (
        <LayoutLogged>
          {children}
        </LayoutLogged>
      )}

      {!isLogged && (
        <LayoutNotLogged>
          {children}
        </LayoutNotLogged>
      )}
    </>
  );
}
