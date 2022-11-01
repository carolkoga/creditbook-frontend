import axios from 'axios';

// IBGE API --> https://dev.iugu.com/reference/metadados
export const iugoApi = axios.create({
  baseURL: 'https://api.iugu.com/v1',
});
