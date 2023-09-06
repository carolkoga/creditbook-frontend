import { useCallback, useEffect, useState } from 'react';
import { TablePaginationConfig, Tabs } from 'antd';

import BatchesTable from '@components/pages/admin/ManageBatches/BatchesTable';
import { Section } from '@components/Section';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { adminServices } from '@services/creditbook/admin';
import { AnnouncementStatus } from '@type/creditbook';
import { BatchesAdminResponse } from '@type/creditbook/admin';

export default function ManageBatches() {
  const [active, setActive] = useState<AnnouncementStatus>('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [
    batches,
    setBatches] = useState<BatchesAdminResponse>({ batches: [], pages: 1 });

  const loadBatches = useCallback(async () => {
    try {
      const response = await adminServices.indexBatches({
        params: {
          status: active,
          page: currentPage,
        },
      });

      console.log(response);

      setBatches({
        batches: response.data.batches,
        pages: response.data.pages === 0 ? 10 : response.data.pages * 10,
      });
    } catch (err) {
      handleCatchErrorRequest(err as never);
    }
  }, [active, currentPage]);

  function handleChangeTableValues(pagination: TablePaginationConfig) {
    setCurrentPage(pagination.current ?? 1);
  }

  useEffect(() => {
    loadBatches();
  }, [loadBatches]);

  return (
    <>
      <Section.Title as="h1" textColor="dark">Gerenciar Lotes</Section.Title>
      <Tabs defaultActiveKey="pending" onChange={(key) => setActive(key as any)}>
        <Tabs.TabPane tab="Pendente" key="pending">
          <BatchesTable
            dataSource={batches.batches}
            onChange={handleChangeTableValues}
            pagination={{
              total: batches.pages,
            }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Aceitos" key="active">
          <BatchesTable
            dataSource={batches.batches}
            onChange={handleChangeTableValues}
            pagination={{
              total: batches.pages,
            }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Reprovados" key="rejected">
          <BatchesTable
            dataSource={batches.batches}
            onChange={handleChangeTableValues}
            pagination={{
              total: batches.pages,
            }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Solicitação de edição" key="edition_requested">
          <BatchesTable
            dataSource={batches.batches}
            onChange={handleChangeTableValues}
            pagination={{
              total: batches.pages,
            }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Deletados" key="deleted">
          <BatchesTable
            dataSource={batches.batches}
            onChange={handleChangeTableValues}
            pagination={{
              total: batches.pages,
            }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Vendidos" key="sold">
          <BatchesTable
            dataSource={batches.batches}
            onChange={handleChangeTableValues}
            pagination={{
              total: batches.pages,
            }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Pagamentos Reprovados" key="payment_failed">
          <BatchesTable
            dataSource={batches.batches}
            onChange={handleChangeTableValues}
            pagination={{
              total: batches.pages,
            }}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
