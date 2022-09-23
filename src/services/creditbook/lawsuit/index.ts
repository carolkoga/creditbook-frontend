class LawsuitService {
  createLawsuit(data: any) {
    const formData = new FormData();

    Object.entries(data).forEach((field) => {
      const [key, value] = field;
      formData.append(key, (value as string | Blob));
    });
  }
}

export const lawsuitService = new LawsuitService();
