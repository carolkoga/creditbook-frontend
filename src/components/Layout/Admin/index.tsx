import { ReactNode } from 'react';
import { Layout } from 'antd';

import NavBarAdmin from '@components/pages/admin/NavBar';
import SidebarAdmin from '@components/pages/admin/Sidebar';
import TopicsMenu, { TopicProps } from '@components/pages/admin/TopicsMenu';
import { Content, Header } from './styled';

interface IProps {
  children: ReactNode
}

const adminRoutesPrefix = '/admin';

const adminRoutes: TopicProps[] = [
  {
    label: 'Dashboard',
    link: `${adminRoutesPrefix}/dashboard`,
  },

  {
    label: 'Gerenciar Anúncios',
    link: `${adminRoutesPrefix}/manage-announcements`,
  },

  {
    label: 'Gerenciar Clientes',
    link: `${adminRoutesPrefix}/manage-clients`,
  },
];

export default function AdminLayout({ children }: IProps) {
  return (
    <Layout>
      <SidebarAdmin>
        <TopicsMenu topics={adminRoutes} />
      </SidebarAdmin>
      <Layout className="site-layout">
        <Header>
          <NavBarAdmin menu={adminRoutes} />
        </Header>
        <Content>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
