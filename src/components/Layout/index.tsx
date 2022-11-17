import { ContainerLayout } from '@styles/index';
import useAuth from 'hooks/useAuth';
import { ReactNode } from 'react';
import AdminLayout from './Admin';
import LayoutLogged from './Logged';
import LayoutNotLogged from './NotLogged';

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  const { user } = useAuth();

  if (!user) {
    return (
      <ContainerLayout>
        <LayoutNotLogged>
          {children}
        </LayoutNotLogged>
      </ContainerLayout>
    );
  }

  if (user?.role === 'admin') {
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
      <LayoutLogged>
        {children}
      </LayoutLogged>
    </ContainerLayout>
  );
}
