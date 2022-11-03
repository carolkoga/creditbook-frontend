/* eslint-disable no-param-reassign */
import axios from 'axios';

// IUGU API --> https://dev.iugu.com/reference/metadados

const iugoEmail = process.env.NEXT_PUBLIC__IUGU_EMAIL;
const iugoPassword = process.env.NEXT_PUBLIC__IUGU_PASSWORD;

const encondeKeyApi = Buffer.from(`${iugoEmail}:${iugoPassword}`).toString('base64');

export const iuguApi = axios.create({
  baseURL: 'https://api.iugu.com/v1',
  headers: {
    Authorization: `Basic ${encondeKeyApi}`,
    'Proxy-Authorization': `Basic ${encondeKeyApi}`,
  },
});
