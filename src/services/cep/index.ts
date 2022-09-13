import axios, { AxiosInstance } from 'axios';

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
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://viacep.com.br/ws',
    });
  }

  async getAddressByCep(cep: string) {
    return await this.httpClient.get<CepResponse>(`${cep}/json`);
  }
}

export const cepService = new CepService();
