import BatchesList from '@components/BatchCard';

import { Section } from '@components/Section';
import TabBatchAnnouncement from '@components/TabBatchAnnouncement';

import { batchServices } from '@services/creditbook/batch';
import { BatchParams } from '@type/creditbook/Batch';
import { useCallback, useEffect, useState } from 'react';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';

export default function BuyBatches() {
  const [batches, setBatches] = useState([] as BatchParams[]);

  const loadBatches = useCallback(async () => {
    try {
      const response = await batchServices.list();
      setBatches(response.data);
    } catch (err) {
      handleCatchErrorRequest(err as never);
    }
  }, []);

  useEffect(() => {
    loadBatches();
  }, [loadBatches]);

  return (
    <TabBatchAnnouncement announcementLink="/in/buy-credits" batchLink="/in/buy-credits/batches">
      <Section.Header>
        <Section.Title as="h1">Comprar lotes</Section.Title>
      </Section.Header>

      <Section.Container>
        <BatchesList batches={batches} />
      </Section.Container>
    </TabBatchAnnouncement>
  );
}
