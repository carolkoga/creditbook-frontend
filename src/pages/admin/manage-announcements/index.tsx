import { useCallback, useEffect, useState } from 'react';
import { Tabs } from 'antd';

import AnnouncementsTable from '@components/pages/admin/ManageAnnouncements/AnnouncementsTable';
import { Section } from '@components/Section';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { adminServices, AnnouncementsAdminResponse, AnnouncementStatus } from '@services/creditbook/admin';

export default function ManageAnnouncements() {
  const [active, setActive] = useState<AnnouncementStatus>('pending');
  const [
    announcements,
    setAnnouncements] = useState<AnnouncementsAdminResponse>({ announcements: [], pages: 1 });

  const loadAnnouncements = useCallback(async () => {
    try {
      const response = await adminServices.indexAnnouncements({
        params: {
          status: active,
        },
      });

      setAnnouncements(response.data);
    } catch (err) {
      handleCatchErrorRequest(err as never);
    }
  }, [active]);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  return (
    <>
      <Section.Title as="h1" textColor="dark">Gerenciar Anúncios</Section.Title>
      <Tabs defaultActiveKey="pending" onChange={(key) => setActive(key as any)}>
        <Tabs.TabPane tab="Pendente" key="pending">
          <AnnouncementsTable dataSource={announcements.announcements} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Aceitos" key="accepted">
          <AnnouncementsTable dataSource={announcements.announcements} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Inativos" key="inactive">
          <AnnouncementsTable dataSource={announcements.announcements} />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
