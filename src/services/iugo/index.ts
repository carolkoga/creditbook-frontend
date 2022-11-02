import { iugoApi } from '@api/iugo';
import { NewPaymentParams } from '@type/creditbook/payment';

class IugoServices {
  async createToken(creditCard: NewPaymentParams) {
    const monthParsed = creditCard.validate.split('/')[0];
    const yearParsed = creditCard.validate.split('/')[1];
    const fullNameParsed = creditCard.completeName.split(' ');
    const firstName = fullNameParsed[0];
    const lastName = fullNameParsed.slice(1, fullNameParsed.length).join(' ');

    const response = await iugoApi.post('/payment_token', {
      accountId: process.env.NEXT_PUBLIC__IUGO_ACCOUNT_ID,
      method: 'credit_card',
      test: true,
      data: {
        number: creditCard.cardNumber.replaceAll(' ', ''),
        verification_value: creditCard.secureCode,
        month: monthParsed,
        year: yearParsed,
        first_name: firstName,
        last_name: lastName,
      },
    });

    return response.data.id;
  }
}

export const iugoServices = new IugoServices();
