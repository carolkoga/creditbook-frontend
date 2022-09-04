import { HttpClient } from '@services/https/HttpClient';

export interface CepResponse {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string
}

class CepService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('https://viacep.com.br/ws');
  }

  async getAddressByCep(cep: string) {
    return await this.httpClient.get(`${cep}/json`) as CepResponse;
  }
}

export default new CepService();
