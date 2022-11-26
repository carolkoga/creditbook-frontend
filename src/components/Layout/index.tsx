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
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  if (
    (isAuthenticated || router.pathname.startsWith('/login')) && router.pathname.startsWith('/in')) {
    return (
      <ContainerLayout>
        <LayoutLogged>
          {children}
        </LayoutLogged>
      </ContainerLayout>
    );
  }

  if (
    user?.role === 'admin' && (router.pathname.startsWith('/login') || router.pathname.startsWith('/admin'))) {
    return (
      <ContainerLayout>
        <AdminLayout>
          {children}
        </AdminLayout>
      </ContainerLayout>
    );
  }

  return (
    <ContainerLayout>
      <LayoutNotLogged>
        {children}
      </LayoutNotLogged>
    </ContainerLayout>
  );
}
