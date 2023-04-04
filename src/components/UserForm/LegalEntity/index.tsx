import { Controller, useFormContext } from 'react-hook-form';

import { Button, Link } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';
import { Section } from '@components/Section';

import { AccountCommonParams, RegistrationParams } from '@type/creditbook/auth/register';

import AddressForm from '../components/AddressForm';
import { FormGrid } from '../components/FormGrid';
import InformationForm from '../components/InformationForm';
import PasswordForm from '../components/PasswordForm';
import ProfilePictureForm from '../components/ProfilePictureForm';
import { FormCommonType } from '../types';
import UpdatePasswordForm from '../components/UpdatePasswordForm';
import { UploadSocialContract } from './components/UploadSocialContract';

export interface CorporationParams extends Omit<RegistrationParams<'corporation'>, 'type'> {}

export default function LegalEntity({
  onSubmit, formGroupDirection, loading, label, validation,
}: FormCommonType) {
  const { control, register, formState: { errors } } = useFormContext<AccountCommonParams | any>();

  return (
    <Section.Container bg="white">
      {validation === 'register' && (
        <Section.Header>
          <Section.Title>Cadastro Pessoa Jurídica</Section.Title>
        </Section.Header>
      )}

      <FormGrid noValidate onSubmit={onSubmit}>
        <InformationForm formGroupDirection={formGroupDirection} nationalityLabel="Local de constituição">
          <ProfilePictureForm label="Foto de Perfil" formGroupDirection={formGroupDirection} />
          <UploadSocialContract />

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
          <Link href="/login" size="outline-filled-round" variant="white">
            Login
          </Link>

          <Button
            type="submit"
            size="outline-filled-round"
            isLoading={loading}
          >
            {label}
          </Button>
        </div>
      </FormGrid>
    </Section.Container>
  );
}
