import { countriesApi } from '@api/countriesApi';

class CountriesService {
  async listCountries() {
    return countriesApi.get('/all');
  }
}

export const countriesService = new CountriesService();
