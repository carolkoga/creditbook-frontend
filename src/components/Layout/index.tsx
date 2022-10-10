import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import AdminLayout from './Admin';
import LayoutLogged from './Logged';
import LayoutNotLogged from './NotLogged';

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <>
      {(!isAuthenticated && router.pathname.startsWith('/admin')) && (
        <AdminLayout>
          {children}
        </AdminLayout>
      )}

      {isAuthenticated && (
        <LayoutLogged>
          {children}
        </LayoutLogged>
      )}

      {(!isAuthenticated && !router.pathname.startsWith('/admin')) && (
        <LayoutNotLogged>
          {children}
        </LayoutNotLogged>
      )}

    </>
  );
}
