// import { GetServerSideProps } from 'next';

import { BatchesFilterDrawer, ResponseFilterBatchesProps } from '@components/FilterDrawer/Batches';
import TabBatchAnnouncement from '@components/TabBatchAnnouncement';
import { batchServices } from '@services/creditbook/batch';
import { BatchParams } from '@type/creditbook/Batch';
import NotFoundData from '@components/NotFoundData';
import BatchesList from '@components/BatchCard';
import { Section } from '@components/Section';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// interface IProps {
// batches: BatchParams[] | null
// }

export default function Batches(/* { batches }: IProps */) {
  const [allBatches, setAllBatches] = useState<BatchParams[]>([]);

  const loadBatches = useCallback(async () => {
    try {
      const response = await batchServices.list();

      setAllBatches([
        ...response.data,
      ]);
    } catch {
      toast.error('ocorreu um erro, tente novamente');
    }
  }, []);

  useEffect(() => {
    loadBatches();
  }, []);

  function handleProcessBatchesFiltered(filteredBatches: ResponseFilterBatchesProps) {
    setAllBatches(filteredBatches.results);
  }

  return (
    <TabBatchAnnouncement batchLink="/batches" announcementLink="/ads">
      <Section.Header>
        <Section.Title as="h1">Anúncios em Lotes</Section.Title>

        <BatchesFilterDrawer onGetResponseResults={handleProcessBatchesFiltered} />
      </Section.Header>

      <Section.Container>
        {/* {batches?.length
          ? (
            <BatchesList batches={batches} />
          )
          : (
            <NotFoundData title="Não há dados cadastrados" type="children" />
          )} */}

        {allBatches.length > 0 && (
          <BatchesList batches={allBatches} />
        )}

        {allBatches.length === 0 && (
          <NotFoundData title="Não há dados cadastrados" type="children" />
        )}
      </Section.Container>
    </TabBatchAnnouncement>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   let batches = null;

//   try {
//     const response = await batchServices.list({ params: { currentUserId: user.id } });

//     batches = response.data;
//   } catch {
//     console.error('Happened an Error');
//   }

//   return {
//     props: {
//       batches,
//     },
//   };
// };
