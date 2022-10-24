import { GetServerSideProps } from 'next';

import BatchesList from '@components/BatchCard';

import { Section } from '@components/Section';
import TabBatchAnnouncement from '@components/TabBatchAnnouncement';

import { batchServices } from '@services/creditbook/batch';
import { BatchParams } from '@type/creditbook/Batch';

interface IProps {
  initialBatches: BatchParams[]
}
export default function BuyBatches({ initialBatches }: IProps) {
  return (
    <TabBatchAnnouncement announcementLink="/in/buy-credits" batchLink="/in/buy-credits/batches">
      <Section.Header>
        <Section.Title as="h1">Comprar lotes</Section.Title>
      </Section.Header>

      <Section.Container>
        {(initialBatches?.length > 0) && (
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
