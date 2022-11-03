import { AxiosInstance } from 'axios';

import { iuguServices } from '@services/iugu';
import { NewPaymentParams } from '@type/creditbook/payment';

import { HttpClient } from '../http';

export class PaymentServices extends HttpClient {
  constructor(api?: AxiosInstance) {
    super(api);
  }

  async listPayments() {
    return await this.httpClient.get('/payment');
  }

  async createPayment(payment: NewPaymentParams) {
    const token = await iuguServices.createToken(payment);
    return await this.httpClient.post('/payment', { ...payment, token });
  }

  async deletePayment(id: string) {
    return await this.httpClient.delete(`/payment/${id}`);
  }
}

export const paymentServices = new PaymentServices();
