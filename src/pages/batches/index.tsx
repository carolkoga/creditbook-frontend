import { GetServerSideProps } from 'next';

import { Section } from '@components/Section';
import TabBatchAnnouncement from '@components/TabBatchAnnouncement';
import { batchServices } from '@services/creditbook/batch';
import { BatchParams } from '@type/creditbook/Batch';
import BatchesList from '@components/BatchCard';

interface IProps {
  batches: BatchParams[]
}

export default function Batches({ batches }: IProps) {
  return (
    <TabBatchAnnouncement batchLink="/batches" announcementLink="/ads">
      <Section.Header>
        <Section.Title as="h1">Lotes</Section.Title>
      </Section.Header>

      <Section.Container>
        {(batches?.length) && (
          <BatchesList batches={batches} />
        )}
      </Section.Container>
    </TabBatchAnnouncement>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await batchServices.list();

  return {
    props: {
      batches: data,
    },
  };
};
