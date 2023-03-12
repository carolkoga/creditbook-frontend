import { AccountTypes, Address } from '..';

export type Buyer = {
  address: Address;
  email: string;
  phone: string;
  name: string;

  cnpj?: string;
  cpf?: string;
  rg?: string;

  type: AccountTypes;
};

export type SalePaymentData = {
  holderDocument: string;
  accountNumber: string;
  agencyNumber: string;
  accountType: string;
  holderName: string;
  bank: string;

  inCash: boolean;

  installments?: `${number}x`;

  paymentMethod: 'pix' | 'boleto' | 'transferência';
};

export type CommunicateSellingParams = {
  paymentData: SalePaymentData;
  saleValue: number;

  buyer: Buyer;

  // -------------------------
  emitContract: boolean;

  batchId?: string | null;
  announcementId?: string | null;
};
