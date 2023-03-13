import { CommunicateSellingParams } from '@type/creditbook/contactSale';
import { FieldDeclareFormTypes } from '@type/creditbook/sale/declare';
import { mapperCurrency } from '@utils/mapperCurrency';

export function SendMapper(data: FieldDeclareFormTypes) {
  const dataParsed = {
    emitContract: Boolean(data.emitContract),
    announcementId: data.processInfo.processType === 'announcement' ? data.processInfo.processId.value : null,
    batchId: data.processInfo.processType === 'batch' ? data.processInfo.processId.value : null,
    paymentData: {
      accountNumber: data.payment.bankInfo.numberAccount,
      holderDocument: data.payment.bankInfo.holderDocument,
      bank: data.payment.bankInfo.bank,
      holderName: data.payment.bankInfo.holder,
      agencyNumber: data.payment.bankInfo.agency,
      paymentMethod: data.payment.paymentMethod.value === 'transferencia'
        ? 'transferência'
        : data.payment.paymentMethod.value as CommunicateSellingParams['paymentData']['paymentMethod'],
      accountType: data.payment.bankInfo.accountType.value,
      installments: data.payment.paymentType === 'installments' ? `${data.payment.installments as unknown as number}x` : null,
      inCash: data.payment.paymentType === 'cash',
    },
    saleValue: mapperCurrency(data.processPrice),
  } as CommunicateSellingParams;

  if (data.buyer.personType === 'pf') {
    const buyerPF = data.buyer.pf;
    const buyer = {
      name: buyerPF!.name,
      address: data.address,
      email: buyerPF!.email,
      phone: buyerPF!.cellphone,
      cpf: buyerPF!.cpf,
      rg: buyerPF!.rg,
      type: 'person',
    } as CommunicateSellingParams['buyer'];

    Object.assign(dataParsed, { buyer });
  }

  if (data.buyer.personType === 'pj') {
    const buyerPF = data.buyer.pj;
    const buyer = {
      name: buyerPF!.socialName,
      address: data.address,
      email: buyerPF!.email,
      phone: buyerPF!.cellphone,
      cpf: buyerPF!.cnpj,
      type: 'corporation',
    } as CommunicateSellingParams['buyer'];

    Object.assign(dataParsed, { buyer });
  }

  return dataParsed;
}
