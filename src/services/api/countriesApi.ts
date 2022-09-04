import { HttpClient } from '@services/https/HttpClient';

// Rest Countries --> https://restcountries.com/
export const countriesApi = new HttpClient('https://restcountries.com/v3.1');
