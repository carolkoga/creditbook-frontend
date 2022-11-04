import { iuguServices } from '@services/iugu';
import { NewPaymentParams } from '@type/creditbook/payment';

import { HttpClient } from '../http';

export class PaymentServices extends HttpClient {
  async listPayments() {
    return this.httpClient.get('/payment');
  }

  async createPayment(payment: NewPaymentParams) {
    const token = await iuguServices.createToken(payment);
    return this.httpClient.post('/payment', { ...payment, token });
  }

  async deletePayment(id: string) {
    return this.httpClient.delete(`/payment/${id}`);
  }
}

export const paymentServices = new PaymentServices();
