class UpdateUseCase {
  handle(data: any, originalData: any) {
    const formData = new FormData();
    Object.entries(data).forEach((field) => {
      const [key, value] = field;
      if (key === 'profilePictureKey' || key === 'profilePictureUrl' || key === 'profilePicture') {
        const profilePictureValue = value;

        if (!profilePictureValue) return;

        if (typeof profilePictureValue === 'string') {
          return;
        }
      }

      if (key === 'id' || key === 'userId') return;

      if (key === 'currentPassword') {
        if (!value) return;
      }

      if (key === 'newPassword') {
        if (!value) return;
      }

      if (originalData[key] === value) return;

      formData.append(key, (value as string | Blob));
    });

    return formData;
  }
}

export const updateUseCase = new UpdateUseCase();
