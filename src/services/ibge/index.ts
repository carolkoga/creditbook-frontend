import { ibgeApi } from '@api/ibgeApi';
import { UFList } from '@type/brazil/BrazilStatesInUFTypes';

class IbgeServices {
  async municipalitiesByUF(uf: keyof UFList) {
    return ibgeApi.get(`localidades/estados/${uf}/municipios?orderBy=nome`);
  }
}

export const IBGEService = new IbgeServices();
