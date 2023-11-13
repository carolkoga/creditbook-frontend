export interface PaymentParams {
  id: string,
  userId: string,
  token: string,

  cardNumberDisplay: string,
  paymentMethodId: string,
  brand: string
}

export interface NewPaymentParams {
  cardNumber: string,
  secureCode: string,
  completeName: string,
  validate: string,
  paymentMethodId?: string;
}
