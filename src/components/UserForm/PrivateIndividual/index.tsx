import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { RegistrationParams } from '@type/creditbook/auth/register';

import { Button } from '@components/Button';
import { Section } from '@components/Section';

import { registerPersonAccountSchema } from '@validations/yup/UserForm';
import { updatePersonAccountSchema } from '@validations/yup/UserForm/update';

import AddressForm from '../components/AddressForm';
import { FormGrid } from '../components/FormGrid';
import InformationForm from '../components/InformationForm';
import PasswordForm from '../components/PasswordForm';
import ProfilePictureForm from '../components/ProfilePictureForm';
import { FormCommonType } from '../types';
import UpdatePasswordForm from '../components/UpdatePasswordForm';

export interface PersonParams extends Omit<RegistrationParams<'person'>, 'type'> {}

export default function PrivateIndividual({
  onSubmit, formGroupDirection, loading, label, validation, defaultValues,
}: FormCommonType) {
  const validationSchema = (
    validation === 'register'
      ? registerPersonAccountSchema
      : validation === 'update' && updatePersonAccountSchema
  );

  const methods = useForm<PersonParams | any>({
    resolver: yupResolver(validationSchema as any),
    mode: 'onBlur',
    defaultValues: !defaultValues ? {} : defaultValues,
  });
  const { handleSubmit } = methods;

  return (
    <Section.Container bg="white">
      {validation === 'register' && (
        <Section.Header>
          <Section.Title as="h1">Cadastro Pessoa Física</Section.Title>
        </Section.Header>
      )}

      <FormProvider {...methods}>
        <FormGrid autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
          <InformationForm formGroupDirection={formGroupDirection} nationalityLabel="Nacionalidade">
            {validation === 'register' && (
              <ProfilePictureForm
                label="Foto de Perfil"
                formGroupDirection={formGroupDirection}
              />
            )}

            {validation === 'update' && (
              <ProfilePictureForm
                size={64}
                formGroupDirection={formGroupDirection}
              />
            )}
          </InformationForm>

          <AddressForm formGroupDirection={formGroupDirection} />

          {validation === 'register' && (
            <PasswordForm formGroupDirection={formGroupDirection} />
          )}

          {validation === 'update' && (
            <UpdatePasswordForm formGroupDirection={formGroupDirection} />
          )}

          <div className="actions">
            <Button
              type="submit"
              size="outline-filled-round"
              isLoading={loading}
            >
              {label}
            </Button>
          </div>
        </FormGrid>
      </FormProvider>

    </Section.Container>
  );
}
