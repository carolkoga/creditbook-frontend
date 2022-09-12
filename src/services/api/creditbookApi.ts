import axios from 'axios';
import { parseCookies } from 'nookies';

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'https://creditbook-api.herokuapp.com',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`,
    },
  });

  return api;
}

export const creditbookApi = setupAPIClient();
