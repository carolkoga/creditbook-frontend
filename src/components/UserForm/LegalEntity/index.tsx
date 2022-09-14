import { Controller, useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';

import { Section } from '@components/Section';

import { RegistrationParams } from '@type/creditbook/auth/register';
import { registerCorporationAccountSchema } from '@validations/yup/UserForm';

import { updateCorporationAccountSchema } from '@validations/yup/UserForm/update';
import AddressForm from '../components/AddressForm';
import { FormGrid } from '../components/FormGrid';
import InformationForm from '../components/InformationForm';
import PasswordForm from '../components/PasswordForm';
import ProfilePictureForm from '../components/ProfilePictureForm';
import { FormCommonType } from '../types';

export interface CorporationParams extends Omit<RegistrationParams<'corporation'>, 'type'> {}

export default function LegalEntity({
  onSubmit, formGroupDirection, loading, label, validation,
}: FormCommonType<CorporationParams>) {
  const validationSchema = (
    validation === 'register'
      ? registerCorporationAccountSchema
      : validation === 'update' && updateCorporationAccountSchema
  );
  const methods = useForm<CorporationParams>({
    resolver: yupResolver(validationSchema as any),
    mode: 'onBlur',
  });

  const {
    handleSubmit, control, register, formState: { errors },
  } = methods;

  return (
    <Section.Container bg="white">
      <Section.Header>
        <Section.Title>Cadastro Pessoa Jurídica</Section.Title>
      </Section.Header>

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
                placeholder="Carvalho & Nair LTDA"
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
                    placeholder="32.683.609/0001-07"
                    mask="00.000.000/0000-00"
                  />
                </FormGroup>
              )}
            />
          </InformationForm>
          <AddressForm formGroupDirection={formGroupDirection} />
          <PasswordForm formGroupDirection={formGroupDirection} />

          <div className="actions">
            <Button type="submit" size="outline-filled-round" isLoading={loading}>
              {label}
            </Button>
          </div>
        </FormGrid>
      </FormProvider>
    </Section.Container>
  );
}
