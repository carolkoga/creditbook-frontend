/* eslint-disable no-param-reassign */
import axios from 'axios';

// IUGU API --> https://dev.iugu.com/reference/metadados

const encondeKeyApi = Buffer.from(`${process.env.NEXT_PUBLIC__IUGO_DEV_KEY}:`).toString('base64');

export const iuguApi = axios.create({
  baseURL: 'https://api.iugu.com/v1',
  headers: {
    Authorization: `Basic ${encondeKeyApi}`,
  },
});
