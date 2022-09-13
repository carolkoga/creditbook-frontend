import axios from 'axios';

// Rest Countries --> https://restcountries.com/
export const countriesApi = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
});
