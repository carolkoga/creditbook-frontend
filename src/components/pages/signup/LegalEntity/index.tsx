import { Controller, useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@components/Button/styled';
import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';

import { Section } from '@components/Section';

import { RegistrationParams } from '@type/creditbook/auth/register';
import { registerCorporationAccountSchema } from 'app/validations/yup/signup';

import AddressForm from '../components/AddressForm';
import { FormGrid } from '../components/FormGrid';
import InformationForm from '../components/InformationForm';
import NationalitySelect from '../components/NationalitySelect';
import PasswordForm from '../components/PasswordForm';

export interface CorporationParams extends Omit<RegistrationParams<'corporation'>, 'type'> {}

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: CorporationParams) => void
  formGroupDirection: 'horizontal' | 'vertical',
}

export default function LegalEntity({ onSubmit, formGroupDirection }: IProps) {
  const methods = useForm<CorporationParams>({
    resolver: yupResolver(registerCorporationAccountSchema),
    mode: 'all',
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
          <InformationForm formGroupDirection={formGroupDirection}>
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

            <NationalitySelect formGroupDirection={formGroupDirection} />
          </InformationForm>
          <AddressForm formGroupDirection={formGroupDirection} />
          <PasswordForm formGroupDirection={formGroupDirection} />

          <div className="actions">
            <Button type="submit" size="outline-filled-round">
              Cadastrar
            </Button>
          </div>
        </FormGrid>
      </FormProvider>
    </Section.Container>
  );
}
