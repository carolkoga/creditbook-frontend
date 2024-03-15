import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LegalEntity from '@components/UserForm/LegalEntity';
import PrivateIndividual from '@components/UserForm/PrivateIndividual';
import { Section } from '@components/Section';

import useAuth from '@hooks/useAuth';
import useDimensions from '@hooks/useDimensions';

import { UserDefaultValues } from '@type/creditbook';

import { userCreditbookService } from '@type/user';

import { Direction } from '@styles/pages/home';

import { updateCorporationAccountSchema, updatePersonAccountSchema } from '@validations/yup/UserForm/update';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { commonToastProps } from '@components/configs/toast';
import { StructureSettings } from '@components/pages/in/Settings/StructureSettings';

export default function Profile() {
  const { user, handleUpdateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { dimensionsOverlimit } = useDimensions();
  const { widthOverlimit } = dimensionsOverlimit(870);

  console.log(user);

  const defaultValues = useMemo(() => ({
    ...user,
    bornDate: user?.bornDate.substring(0, 10),
    newPassword: null,
    currentPassword: null,
    nationality: { label: user?.nationality, value: user?.nationality },
    address: user?.address,
    profilePicture: user?.profilePictureUrl,
  }), [user]);

  const methodsCorporations = useForm({
    resolver: yupResolver(updateCorporationAccountSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues,
  });

  const methodsPerson = useForm({
    resolver: yupResolver(updatePersonAccountSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues,
  });

  const reloadDefaultValues = useCallback(() => {
    methodsCorporations.reset({
      ...user,
      bornDate: user?.bornDate.substring(0, 10),
      newPassword: null,
      currentPassword: null,
      nationality: { label: user?.nationality, value: user?.nationality },
      profilePicture: user?.profilePictureUrl,
      address: user?.address,

    });
    methodsPerson.reset({
      ...user,
      bornDate: user?.bornDate.substring(0, 10),
      newPassword: null,
      currentPassword: null,
      nationality: { label: user?.nationality, value: user?.nationality },
      profilePicture: user?.profilePictureUrl,
      address: user?.address,
    });
  }, [user]);

  useEffect(() => {
    reloadDefaultValues();
  }, [reloadDefaultValues]);

  async function handleUpdateAccount(data: UserDefaultValues) {
    try {
      setIsLoading(true);

      const dataParsed = {
        ...data,
        nationality: data.nationality.value,
        bornDate: (new Date(data.bornDate)).toISOString(),
        address: JSON.stringify(data.address),
      };

      const response = await userCreditbookService.update(dataParsed, user);

      handleUpdateUser(response.data);
      setIsLoading(false);
      toast.success('Pefil Atualizado!', commonToastProps);
    } catch (error) {
      handleCatchErrorRequest(error as never);
      setIsLoading(false);
    }
  }

  return (
    <StructureSettings>
      <Section.Header>
        <Direction>
          <Section.Title as="h2" textColor="dark">Editar Perfil</Section.Title>
        </Direction>
      </Section.Header>

      {user?.type === 'person' && (
        <FormProvider {...methodsPerson}>
          <PrivateIndividual
            validation="update"
            onSubmit={methodsPerson.handleSubmit(handleUpdateAccount)}
            loading={isLoading}
            formGroupDirection={widthOverlimit ? 'horizontal' : 'vertical'}
            label={isLoading ? 'Atualizando' : 'Atualizar'}
            defaultValues={defaultValues}
          />
        </FormProvider>
      )}

      {user?.type === 'corporation' && (
        <FormProvider {...methodsCorporations}>
          <LegalEntity
            validation="update"
            onSubmit={methodsCorporations.handleSubmit(handleUpdateAccount)}
            loading={isLoading}
            formGroupDirection={widthOverlimit ? 'horizontal' : 'vertical'}
            label={isLoading ? 'Atualizando' : 'Atualizar'}
            defaultValues={defaultValues}
          />
        </FormProvider>
      )}
    </StructureSettings>
  );
}
