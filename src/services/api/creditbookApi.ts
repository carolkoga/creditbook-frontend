import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

const CREDITBOOK_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-teste.creditbook.com.br';

export function setupAPIClient(ctx: any = undefined) {
  let token = '';

  if (typeof ctx === 'string') {
    token = ctx;
  } else {
    const cookies = parseCookies(ctx);
    token = cookies['nextauth.token'] || cookies['@creditbook:token'] || '';
  }

  const api = axios.create({
    baseURL: CREDITBOOK_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => Promise.reject(error)
  );

  return api;
}

export const creditbookApi = setupAPIClient();

export default creditbookApi;
