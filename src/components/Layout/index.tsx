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
    (isAuthenticated) && router.pathname.startsWith('/admin') && user?.role === 'admin') {
    return (
      <ContainerLayout>
        <AdminLayout>
          {children}
        </AdminLayout>
      </ContainerLayout>
    );
  }

  if (
    (isAuthenticated) && user?.role === 'user' && (router.pathname.startsWith('/in') || router.pathname.startsWith('/ads') || router.pathname.startsWith('/batches'))) {
    return (
      <ContainerLayout customMaxWidth={1920}>
        <LayoutLogged>
          {children}
        </LayoutLogged>
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
