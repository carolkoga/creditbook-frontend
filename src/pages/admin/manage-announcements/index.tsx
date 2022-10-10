import { useMemo } from 'react';
import { Tabs } from 'antd';

import AnnouncementsTable from '@components/pages/admin/ManageAnnouncements/AnnouncementsTable';
import { Section } from '@components/Section';

export default function ManageAnnouncements() {
  const filterTabs = useMemo(() => ([
    {
      label: 'Pendentes',
      key: 'pending',
      children: <AnnouncementsTable dataSource={[
        {
          announcementId: '12',
          key: '1',
          plan: 'paid',
          processNumber: '3156185185169',
          announcementDate: '12 jun 2022',
        },
      ]}
      />,
    },

    {
      label: 'Aprovados',
      key: 'accepted',
      children: <AnnouncementsTable dataSource={[]} />,
    },

    {
      label: 'Inativos',
      key: 'inactive',
      children: <AnnouncementsTable dataSource={[]} />,
    },
  ]), []);

  return (
    <>
      <Section.Title as="h1" textColor="dark">Gerenciar Anúncios</Section.Title>
      <Tabs defaultActiveKey="pending" items={filterTabs} />
    </>
  );
}
