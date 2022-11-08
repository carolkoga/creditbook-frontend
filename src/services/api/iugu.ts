import axios from 'axios';

// IUGU API --> https://dev.iugu.com/reference/metadados

// const iuguEmail = process.env.NEXT_PUBLIC__IUGU_EMAIL;
// const iuguPassword = process.env.NEXT_PUBLIC__IUGU_PASSWORD;

// const encodedCredentialsToBase64 =
// Buffer.from(`${iuguEmail}:${iuguPassword}`).toString('base64');

const encodedTokenToBase64 = Buffer.from(`${process.env.NEXT_PUBLIC__IUGU_DEV_KEY}:`).toString('base64');

export const iuguApi = axios.create({
  baseURL: 'https://api.iugu.com/v1',
  headers: {
    authorization: `Bearer ${encodedTokenToBase64}`,
  },
});
