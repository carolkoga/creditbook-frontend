import { useRef, useState } from 'react';
import { AxiosError } from 'axios';

import LegalEntity from '@components/UserForm/LegalEntity';
import PrivateIndividual from '@components/UserForm/PrivateIndividual';

import { Direction } from '@styles/pages/home';
import { Section } from '@components/Section';
import useDimensions from '@hooks/useDimensions';
import useAuth from 'hooks/useAuth';
import { userCreditbookService } from '@services/creditbook/user';
import { UserDefaultValues } from '@type/creditbook';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';

export default function Profile() {
  const { user, handleUpdateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { dimensionsOverlimit } = useDimensions();
  const { widthOverlimit } = dimensionsOverlimit(870);
  const defaultValuesRef = useRef<UserDefaultValues>({
    fullName: user?.fullName,
    address: user?.address,
    bornDate: user?.bornDate.substring(0, 10),
    cellphone: user?.cellphone,
    cpf: user?.cpf,
    email: user?.email,
    userId: user?.id,
    rg: user?.rg,
    type: user?.type,
    newPassoword: '',
    currentPassword: '',
    profilePicture: user?.profilePictureUrl,
    nationality: { label: user?.nationality, value: user?.nationality },
  } as UserDefaultValues);

  async function handleUpdateAccount(data: UserDefaultValues) {
    try {
      setIsLoading(true);
      const dataParsed = {
        ...data,
        nationality: data.nationality.value,
        bornDate: (new Date(data.bornDate)).toISOString(),
        address: JSON.stringify(data.address),
      };
      delete dataParsed.profilePicture;
      delete dataParsed.newPassoword;

      const response = await userCreditbookService.update(dataParsed);

      handleUpdateUser(response.data);
      setIsLoading(false);
    } catch (error) {
      handleCatchErrorRequest(error as AxiosError);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Section.Header>
        <Direction>
          <Section.Title as="h2" textColor="dark">Editar Perfil</Section.Title>
        </Direction>
      </Section.Header>

      {user?.type === 'person' && (
        <PrivateIndividual
          validation="update"
          onSubmit={handleUpdateAccount}
          loading={isLoading}
          formGroupDirection={widthOverlimit ? 'horizontal' : 'vertical'}
          label={isLoading ? 'Atualizando' : 'Atualizar'}
          defaultValues={defaultValuesRef.current}
        />
      )}

      {user?.type === 'corporation' && (
        <LegalEntity
          validation="update"
          onSubmit={handleUpdateAccount}
          loading={isLoading}
          formGroupDirection={widthOverlimit ? 'horizontal' : 'vertical'}
          label={isLoading ? 'Atualizando' : 'Atualizar'}
          defaultValues={defaultValuesRef.current}
        />
      )}
    </>
  );
}
