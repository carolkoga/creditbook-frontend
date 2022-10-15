export interface PaymentParams {
  id: string,
  cardNumber: string,
  secureCode: string,
  completeName: string,
  validate: string
  userId: string
}

export interface NewPaymentParams extends Omit<PaymentParams, 'id' | 'userId'> { }
