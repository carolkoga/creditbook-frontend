import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';

import BatchesList from '@components/BatchCard';
import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';

import { Section } from '@components/Section';
import TabBatchAnnouncement from '@components/TabBatchAnnouncement';

import { batchServices } from '@services/creditbook/batch';
import { BatchParams } from '@type/creditbook/Batch';

interface IProps {
  initialBatches: BatchParams[]
}
export default function BuyBatches({ initialBatches }: IProps) {
  const [filteredBatches, setFilteredBatches] = useState<BatchParams[]>([]);
  // eslint-disable-next-line no-unused-vars
  const [totalPagesFilteredBatches, setTotalPagesFilteredBatches] = useState(1);

  function handleGetResponse(batches: ResponseFilterCreditsProps<'batches'>) {
    if (batches?.results.length <= 0) {
      return toast.info('Ops, Não existe nenhum relacionado a suas preferências');
    }

    setFilteredBatches(batches.results);
    setTotalPagesFilteredBatches(batches.pages);
  }

  return (
    <TabBatchAnnouncement announcementLink="/in/buy-credits" batchLink="/in/buy-credits/batches">
      <Section.Header>
        <Section.Title as="h1">Comprar lotes</Section.Title>
        <FilterDrawer onGetResponseResults={handleGetResponse} filter="batches" />
      </Section.Header>

      <Section.Container>
        {filteredBatches?.length > 0 && (
          <BatchesList
            batches={filteredBatches}
          />
        )}

        {(initialBatches?.length > 0 && !filteredBatches?.length) && (
          <BatchesList batches={initialBatches} />
        )}

        {(initialBatches?.length <= 0) && (
          <Section.Title as="strong" textColor="dark">Não existe nenhum anuncio ainda</Section.Title>
        )}
      </Section.Container>
    </TabBatchAnnouncement>
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
