import { ListBatches } from '@components/ListBatches';
import useAuth from '@hooks/useAuth';
import { batchServices } from '@services/creditbook/batch';
import { BatchParams } from '@type/creditbook/Batch';
import { Pagination } from 'antd';
import { useState } from 'react';
import { BatchCard } from './Card';

interface IProps {
  batches: BatchParams[],
  customMine?: boolean | null
  pagination?: {
    perPage?: number,
    total: number,
    paginateByUserBatches: boolean,
  }
}

export default function BatchesList({ customMine, pagination, batches: originalBatches }: IProps) {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [batches, setBatches] = useState(originalBatches || []);

  // eslint-disable-next-line no-unused-vars
  async function loadAnnouncementsFilteredByPage(currentPage: number) {
    try {
      if (pagination?.paginateByUserBatches) {
        const response = await batchServices.listUserBatches();
        setBatches(response.data.announcements as any);
        return;
      }
      const response = await batchServices.list();
      setBatches(response.data.announcements as any);
    } catch {
      setBatches([]);
    }
  }

  function handleChangePage(currentPage: number) {
    setPage(() => currentPage);
    loadAnnouncementsFilteredByPage(currentPage);
  }

  return (
    <>
      {batches?.length > 0 && (
        <ListBatches>
          {batches.map((currentBatch) => (
            <BatchCard
              key={currentBatch.id}
              batch={currentBatch}
              mine={customMine ?? user?.id === currentBatch.userId}
            />
          ))}
        </ListBatches>
      )}

      {pagination && (
        <>
          <br />
          <Pagination
            total={pagination.total * 10}
            defaultCurrent={page}
            onChange={handleChangePage}
          />
        </>
      )}
    </>
  );
}

BatchesList.defaultProps = {
  pagination: null,
  customMine: null,
};
