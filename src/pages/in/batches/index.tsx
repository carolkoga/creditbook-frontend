import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Button } from '@components/Button';
import { Direction } from '@components/Direction';
import { NewBatchFormModal } from '@components/pages/in/batches/NewBatchFormModal';
import { Section } from '@components/Section';
import { BatchServices, batchServices } from '@services/creditbook/batch';
import { BatchParams, NewBatchParams } from '@type/creditbook/Batch';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { setupAPIClient } from '@api/creditbookApi';
import BatchesList from '@components/BatchCard';

interface IProps {
  initialBatches: BatchParams[],
}

export default function Batches({ initialBatches }: IProps) {
  const router = useRouter();
  const [newBatchModalIsVisible, setNewBatchModalIsVisible] = useState(false);

  function handleOpenNewBatchModal() {
    setNewBatchModalIsVisible(true);
  }

  function handleCloseNewBatchModal() {
    setNewBatchModalIsVisible(false);
  }

  async function handleCreateABatch(data: NewBatchParams) {
    try {
      const { data: newestBatch } = await batchServices.create(data);
      setNewBatchModalIsVisible(false);
      router.push(`/in/batches/${newestBatch.id}`);
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

      <BatchesList
        batches={initialBatches}
        notFoundProps={{
          type: 'children',
          children: (
            <Button onClick={handleOpenNewBatchModal} size="outline-filled-round">
              Cadastrar Agora
            </Button>
          ),
        }}
      />

      <NewBatchFormModal
        isVisible={newBatchModalIsVisible}
        onCloseModal={handleCloseNewBatchModal}
        onCreateBatch={handleCreateABatch}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const api = setupAPIClient(req.cookies['nextauth.token']);
  const batchServicesSSR = new BatchServices(api);
  const { data } = await batchServicesSSR.listUserBatches();

  return {
    props: {
      initialBatches: data,
    },
  };
};
