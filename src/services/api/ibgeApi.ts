import axios from 'axios';

// IBGE API --> https://servicodados.ibge.gov.br/api/docs/
export const ibgeApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1',
});
