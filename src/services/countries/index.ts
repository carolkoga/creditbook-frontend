import { countriesApi } from '@services/api/countriesApi';

class CountriesService {
  async listCountries() {
    return await countriesApi.get('/all');
  }
}

export const countriesService = new CountriesService();
