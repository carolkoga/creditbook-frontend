import { ibgeApi } from '@api/ibgeApi';
import { UFList } from '@type/brazil/BrazilStatesInUFTypes';

class IbgeServices {
  async municipalitiesByUF(uf: keyof UFList) {
    return await ibgeApi.get(`localidades/estados/${uf}/municipios?orderBy=nome`);
  }
}

export const IBGEService = new IbgeServices();
