// import { NewPaymentParams } from '@type/creditbook/payment';

import { HttpClient } from '../http';

export interface IuguTokenResponse {
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

type CreatePaymentMethodParams = {
  userId: string
  paymentMethodId: string
};

export class PaymentServices extends HttpClient {
  async listPayments() {
    return this.httpClient.get('/payment');
  }

  async createPaymentMethod({ userId, paymentMethodId }: CreatePaymentMethodParams) {
    return this.httpClient.post('/payment', { userId, paymentMethodId });
  }

  // async createToken(payment: NewPaymentParams) {
  //   return this.httpClient.post<IuguTokenResponse>('/payment/token', {
  //     ...payment,
  //     cardNumber: payment.cardNumber.replaceAll(' ', ''),
  //     validate: payment.validate.split('/').join('/20'),
  //     method: 'credit_card',
  //   });
  // }

  async deletePayment(id: string) {
    return this.httpClient.delete(`/payment/${id}`);
  }
}

export const paymentServices = new PaymentServices();
