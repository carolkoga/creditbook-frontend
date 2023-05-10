import { GetServerSideProps } from 'next';

import { Section } from '@components/Section';
import TabBatchAnnouncement from '@components/TabBatchAnnouncement';
import { batchServices } from '@services/creditbook/batch';
import { BatchParams } from '@type/creditbook/Batch';
import BatchesList from '@components/BatchCard';
import NotFoundData from '@components/NotFoundData';

interface IProps {
  batches: BatchParams[] | null
}

export default function Batches({ batches }: IProps) {
  return (
    <TabBatchAnnouncement batchLink="/batches" announcementLink="/ads">
      <Section.Header>
        <Section.Title as="h1">Anúncios em Lotes</Section.Title>
      </Section.Header>

      <Section.Container>
        {batches?.length
          ? <BatchesList batches={batches} />
          : (
            <NotFoundData title="Não há dados cadastrados" type="children" />
          )}
      </Section.Container>
    </TabBatchAnnouncement>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let batches = null;

  try {
    const response = await batchServices.list();

    batches = response.data;
  } catch {
    console.error('Happened an Error');
  }

  return {
    props: {
      batches,
    },
  };
};
