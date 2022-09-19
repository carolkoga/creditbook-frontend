import axios from 'axios';

export function setupAPIClient(token: any = undefined) {
  if (token) {
    return axios.create({
      baseURL: 'https://creditbook-api.herokuapp.com',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const api = axios.create({
    baseURL: 'https://creditbook-api.herokuapp.com',
  });

  return api;
}

export const creditbookApi = setupAPIClient();
