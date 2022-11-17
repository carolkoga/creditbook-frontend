import { NewPaymentParams } from '@type/creditbook/payment';

import { HttpClient } from '../http';

interface IuguTokenResponse {
  extra_info: {
    bind: string,
    brand: string,
    display_number: string
    holder_name: string,
    month: number,
    year: number
  },
  id: string
}

export class PaymentServices extends HttpClient {
  async listPayments() {
    return this.httpClient.get('/payment');
  }

  async createPayment(payment: IuguTokenResponse) {
    return this.httpClient.post('/payment', {
      extra_info: {
        ...payment.extra_info,
      },
      token: payment.id,
    });
  }

  async createToken(payment: NewPaymentParams) {
    return this.httpClient.post<IuguTokenResponse>('/payment/token', {
      ...payment,
      cardNumber: payment.cardNumber.replaceAll(' ', ''),
      validate: payment.validate.split('/').join('/20'),
    });
  }

  async deletePayment(id: string) {
    return this.httpClient.delete(`/payment/${id}`);
  }
}

export const paymentServices = new PaymentServices();
