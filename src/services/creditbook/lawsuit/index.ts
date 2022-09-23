import { creditbookApi } from '@api/creditbookApi';

class LawsuitService {
  async createLawsuit(data: any) {
    const formData = new FormData();

    Object.entries(data).forEach((field) => {
      const [key, value] = field;
      formData.append(key, (value as string | Blob));
    });

    return await creditbookApi.post('/announcement', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }
}

export const lawsuitService = new LawsuitService();
