import axios from 'axios';

// IUGO API --> https://dev.iugu.com/reference/metadados

const encondeKeyApi = window.btoa(encodeURI(process.env.NEXT_PUBLIC__IUGO_DEV_KEY as string));

export const iugoApi = axios.create({
  baseURL: 'https://api.iugu.com/v1',
  headers: {
    Authorization: `Bearer ${encondeKeyApi}`,
  },
});
