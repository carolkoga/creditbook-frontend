import { NewBatchParams } from '@type/creditbook/Batch';
import { HttpClient } from '../http';

interface UpdateParams {
  id: string,
  batch: NewBatchParams,
}

export class BatchServices extends HttpClient {
  async create(batch: NewBatchParams) {
    const newBatch = {
      ...batch,
      value: batch.value.replaceAll('R$ ', '').replaceAll(',', '').replaceAll('.', ''),
    };

    return this.httpClient.post('/batch', newBatch);
  }

  async list() {
    return this.httpClient.get('/batch/all');
  }

  async listUserBatches() {
    return this.httpClient.get('/batch');
  }

  async show(id: string) {
    return this.httpClient.get(`/batch/${id}`);
  }

  async update({ id, batch }: UpdateParams) {
    return this.httpClient.patch(`/batch/${id}`, batch);
  }

  async delete(id: string) {
    return this.httpClient.delete(`/batch/${id}`);
  }
}

export const batchServices = new BatchServices();
