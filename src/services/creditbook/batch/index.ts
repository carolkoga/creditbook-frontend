import { AxiosInstance } from 'axios';
import { NewBatchParams } from '@type/creditbook/Batch';
import { HttpClient } from '../http';

interface UpdateParams {
  id: string,
  batch: NewBatchParams,
}

export class BatchServices extends HttpClient {
  constructor(api?: AxiosInstance) {
    super(api);
  }

  async create(batch: NewBatchParams) {
    const newBatch = {
      ...batch,
      value: batch.value.replaceAll('R$ ', '').replaceAll(',', '').replaceAll('.', ''),
    };

    return this.httpClient.post('/batch', newBatch);
  }

  async list() {
    return await this.httpClient.get('/batch/all');
  }

  async show(id: string) {
    return await this.httpClient.get(`/batch/${id}`);
  }

  async update({ id, batch }: UpdateParams) {
    return await this.httpClient.patch(`/batch/${id}`, batch);
  }

  async delete(id: string) {
    return await this.httpClient.delete(`/batch/${id}`);
  }
}

export const batchServices = new BatchServices();
