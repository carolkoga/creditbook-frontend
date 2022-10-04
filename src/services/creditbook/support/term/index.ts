import { creditbookApi } from '@api/creditbookApi';
import { TermsParams } from '@type/creditbook/support/term';

class TermsService {
  async getTerms() {
    return await creditbookApi.get<TermsParams>('/terms');
  }

  async createTerms(terms: TermsParams) {
    return await creditbookApi.post<TermsParams>('/terms', terms);
  }
}

export const termsService = new TermsService();
