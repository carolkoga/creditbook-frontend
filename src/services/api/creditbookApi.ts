import axios from 'axios';

const CREDITBOOK_URL = process.env.NEXT_PUBLIC_URL_API;

export function setupAPIClient(token: any = undefined) {
  if (token) {
    return axios.create({
      baseURL: CREDITBOOK_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const api = axios.create({
    baseURL: CREDITBOOK_URL,
  });

  return api;
}

export const creditbookApi = setupAPIClient();
