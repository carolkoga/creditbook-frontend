import axios from 'axios';

// IUGO API --> https://dev.iugu.com/reference/metadados

const encondeKeyApi = Buffer.from(`${process.env.NEXT_PUBLIC__IUGO_DEV_KEY}:`).toString('base64');

export const iugoApi = axios.create({
  baseURL: 'https://api.iugu.com/v1',
  headers: {
    Authorization: `Bearer ${encondeKeyApi}`,
  },
});
