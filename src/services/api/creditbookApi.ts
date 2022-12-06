import axios from 'axios';

const CREDITBOOK_URL = 'https://creditbook-api.herokuapp.com/';

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
