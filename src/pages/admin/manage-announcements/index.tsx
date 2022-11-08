import { useCallback, useEffect, useState } from 'react';
import { TablePaginationConfig, Tabs } from 'antd';

import AnnouncementsTable from '@components/pages/admin/ManageAnnouncements/AnnouncementsTable';
import { Section } from '@components/Section';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { adminServices, AnnouncementsAdminResponse, AnnouncementStatus } from '@services/creditbook/admin';

export default function ManageAnnouncements() {
  const [active, setActive] = useState<AnnouncementStatus>('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [
    announcements,
    setAnnouncements] = useState<AnnouncementsAdminResponse>({ announcements: [], pages: 1 });

  const loadAnnouncements = useCallback(async () => {
    try {
      const response = await adminServices.indexAnnouncements({
        params: {
          status: active,
          page: currentPage,
        },
      });

      setAnnouncements(response.data);
    } catch (err) {
      handleCatchErrorRequest(err as never);
    }
  }, [active, currentPage]);

  function handleChangeTableValues(pagination: TablePaginationConfig) {
    setCurrentPage(pagination.current ?? 1);
  }

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  return (
    <>
      <Section.Title as="h1" textColor="dark">Gerenciar Anúncios</Section.Title>
      <Tabs defaultActiveKey="pending" onChange={(key) => setActive(key as any)}>
        <Tabs.TabPane tab="Pendente" key="pending">
          <AnnouncementsTable
            dataSource={announcements.announcements}
            onChange={handleChangeTableValues}
            pagination={{
              total: announcements.pages,
            }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Aceitos" key="accepted">
          <AnnouncementsTable
            dataSource={announcements.announcements}
            onChange={handleChangeTableValues}
            pagination={{
              total: announcements.pages,
            }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Reprovados" key="rejected">
          <AnnouncementsTable
            dataSource={announcements.announcements}
            onChange={handleChangeTableValues}
            pagination={{
              total: announcements.pages,
            }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Solicitação de edição" key="edition_requested">
          <AnnouncementsTable
            dataSource={announcements.announcements}
            onChange={handleChangeTableValues}
            pagination={{
              total: announcements.pages,
            }}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
