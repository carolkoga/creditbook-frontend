import { GetServerSideProps } from 'next';
import { useState } from 'react';

import { BatchCard } from '@components/BatchCard/Card';
import { Button } from '@components/Button';
import { Direction } from '@components/Direction';
import { ListBatches } from '@components/ListBatches';
import { NewBatchFormModal } from '@components/pages/in/batches/NewBatchFormModal';
import { Section } from '@components/Section';
import { batchServices } from '@services/creditbook/batch';
import { BatchParams, NewBatchParams } from '@type/creditbook/Batch';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import useAuth from '@hooks/useAuth';

interface IProps {
  initialBatches: BatchParams[],
}

export default function Batches({ initialBatches }: IProps) {
  const [newBatchModalIsVisible, setNewBatchModalIsVisible] = useState(false);
  const [batches, setBatches] = useState<BatchParams[]>(initialBatches);
  const { user } = useAuth();

  function handleOpenNewBatchModal() {
    setNewBatchModalIsVisible(true);
  }

  function handleCloseNewBatchModal() {
    setNewBatchModalIsVisible(false);
  }

  async function handleCreateABatch(data: NewBatchParams) {
    try {
      const { data: newestBatch } = await batchServices.create(data);
      setBatches((oldBatches) => ([...oldBatches, newestBatch]));
      setNewBatchModalIsVisible(false);
    } catch (error) {
      handleCatchErrorRequest(error as any);
    }
  }

  return (
    <>
      <Section.Header>
        <Direction direction="horizontal" alignItems="center">
          <Section.Title style={{ marginBottom: 0 }}>Meus Lotes</Section.Title>
          <Button onClick={handleOpenNewBatchModal}>Novo Lote</Button>
        </Direction>
      </Section.Header>
      <ListBatches>
        {batches && batches.map((currentBatch) => (
          <BatchCard
            key={currentBatch.id}
            mine={currentBatch.userId === user?.id}
            batch={currentBatch}
          />
        ))}
      </ListBatches>
      <NewBatchFormModal
        isVisible={newBatchModalIsVisible}
        onCloseModal={handleCloseNewBatchModal}
        onCreateBatch={handleCreateABatch}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await batchServices.list();

  return {
    props: {
      initialBatches: data,
    },
  };
};
