import { Controller, useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';

import { Section } from '@components/Section';

import { AccountCommonParams, RegistrationParams } from '@type/creditbook/auth/register';

import { registerCorporationAccountSchema } from '@validations/yup/UserForm';

import { updateCorporationAccountSchema } from '@validations/yup/UserForm/update';
import AddressForm from '../components/AddressForm';
import { FormGrid } from '../components/FormGrid';
import InformationForm from '../components/InformationForm';
import PasswordForm from '../components/PasswordForm';
import ProfilePictureForm from '../components/ProfilePictureForm';
import { FormCommonType } from '../types';
import UpdatePasswordForm from '../components/UpdatePasswordForm';

export interface CorporationParams extends Omit<RegistrationParams<'corporation'>, 'type'> {}

export default function LegalEntity({
  onSubmit, formGroupDirection, loading, label, validation, defaultValues,
}: FormCommonType) {
  const validationSchema = (
    validation === 'register'
      ? registerCorporationAccountSchema
      : updateCorporationAccountSchema
  );
  const methods = useForm<AccountCommonParams | any>({
    resolver: yupResolver(validationSchema as any),
    mode: 'onBlur',
    defaultValues: !defaultValues ? {} : defaultValues,
  });

  const {
    handleSubmit, control, register, formState: { errors },
  } = methods;

  return (
    <Section.Container bg="white">
      {validation === 'register' && (
        <Section.Header>
          <Section.Title>Cadastro Pessoa Jurídica</Section.Title>
        </Section.Header>
      )}

      <FormProvider {...methods}>
        <FormGrid noValidate onSubmit={handleSubmit(onSubmit)}>
          <InformationForm formGroupDirection={formGroupDirection} nationalityLabel="Local de constituição">
            <ProfilePictureForm label="Foto de Perfil" formGroupDirection={formGroupDirection} />

            <FormGroup
              direction={formGroupDirection}
              error={errors?.corporationName?.message}
              label={{
                forId: 'social-name',
                title: 'Razão Social',
              }}
            >
              <Input
                id="social-name"
                placeholder=" "
                {...register('corporationName')}
              />
            </FormGroup>

            <Controller
              name="cnpj"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormGroup
                  direction={formGroupDirection}
                  error={errors?.cnpj?.message}
                  label={{
                    forId: 'cnpj',
                    title: 'CNPJ',
                  }}
                >
                  <MaskInput
                    {...field}
                    id="cnpj"
                    inputMode="numeric"
                    placeholder=" "
                    mask="00.000.000/0000-00"
                  />
                </FormGroup>
              )}
            />
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
