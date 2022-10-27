import { ContainerLayout } from '@styles/index';
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
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  if (isAuthenticated && user?.role === 'admin') {
    return (
      <ContainerLayout>
        <AdminLayout>
          {children}
        </AdminLayout>
      </ContainerLayout>
    );
  }

  if (isAuthenticated) {
    return (
      <ContainerLayout>
        <LayoutLogged>
          {children}
        </LayoutLogged>
      </ContainerLayout>
    );
  }

  return (
    <ContainerLayout>
      {(!isAuthenticated && !router.pathname.startsWith('/admin')) && (
        <LayoutNotLogged>
          {children}
        </LayoutNotLogged>
      )}

    </ContainerLayout>
  );
}
