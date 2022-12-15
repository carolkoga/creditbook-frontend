import { BatchParams } from '@type/creditbook/Batch';
import { useCallback, useEffect, useState } from 'react';
import { batchServices } from '..';

export default function useUserBatches() {
  const [batches, setBatches] = useState([] as BatchParams[]);
  const loadBatches = useCallback(async () => {
    try {
      const response = await batchServices.listUserBatches();
      setBatches(response.data);
    // eslint-disable-next-line no-empty
    } catch {}
  }, []);

  useEffect(() => {
    loadBatches();
  }, [loadBatches]);

  return {
    batches,
  };
}
