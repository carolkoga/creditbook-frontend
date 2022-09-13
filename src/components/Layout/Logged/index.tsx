import { ReactNode } from 'react';
import { MainWithSideBar, WrapperMainAndSidebar } from '@styles/index';
import Sidebar from '@components/Sidebar';
import useSidebar from '@hooks/useSidebar';
import Header from '@components/Header';

interface IProps {
  children: ReactNode;
}

export default function LayoutLogged({ children }: IProps) {
  const { isCollapsed } = useSidebar();

  return (
    <WrapperMainAndSidebar sidebarCollapsed={isCollapsed}>
      <Sidebar />
      <Header />
      <MainWithSideBar>
        {children}
      </MainWithSideBar>
    </WrapperMainAndSidebar>
  );
}
