import { ibgeApi } from '@api/ibgeApi';
import { UFList } from '@type/brazil/BrazilStatesInUFTypes';

class IbgeServices {
  async munipilitiesByUF(uf: keyof UFList) {
    return await ibgeApi.get(`localidades/estados/${uf}/municipios?orderBy=nome`);
  }
}

export const IBGEService = new IbgeServices();
