import { creditbookApi } from '@api/creditbookApi';
import { NewBatchParams } from '@type/creditbook/Batch';

class BatchServices {
  async create(batch: NewBatchParams) {
    const newBatch = {
      ...batch,
      value: batch.value.replaceAll('R$ ', '').replaceAll(',', '').replaceAll('.', ''),
    };

    return creditbookApi.post('/batch', newBatch);
  }

  async list() {
    return await creditbookApi.get('/batch/all');
  }
}

export const batchServices = new BatchServices();
