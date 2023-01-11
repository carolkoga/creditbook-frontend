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
    (isAuthenticated || router.pathname.startsWith('/login')) && router.pathname.startsWith('/in')
    && user?.role === 'user') {
    return (
      <ContainerLayout customMaxWidth={1920}>
        <LayoutLogged>
          {children}
        </LayoutLogged>
      </ContainerLayout>
    );
  }

  if (
    (isAuthenticated || router.pathname.startsWith('/login'))
    && router.pathname.startsWith('/in')
    && user?.role === 'admin') {
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
