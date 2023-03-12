import { CommunicateSellingParams } from '@type/creditbook/contactSale';
import { FieldDeclareFormTypes } from '@type/creditbook/sale/declare';
import { HttpClient } from '../http/index';
import { SendMapper } from './mappers/SendMapper';

class ContactSale extends HttpClient {
  sendMapper: (data: FieldDeclareFormTypes) => CommunicateSellingParams;

  constructor() {
    super();
    this.sendMapper = (data: FieldDeclareFormTypes) => SendMapper(data);
  }

  async declareSale(data: FieldDeclareFormTypes) {
    const dataParsed = this.sendMapper(data);
    const response = await this.httpClient.post('/communicate-sale', dataParsed);
    return response;
  }
}

export const contactSale = new ContactSale();
