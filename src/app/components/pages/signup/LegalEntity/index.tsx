import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@components/Button/styled';
import FormGroup from '@components/FormGroup';
import { Input, MaskInput } from '@components/Input';

import { HeaderSection, Section, TitleSection } from '@styles/pages/home';

import { RegistrationParams } from '@services/creditbook/auth/types';

import AddressForm from '../components/AddressForm';
import { FormGrid } from '../components/FormGrid';
import InformationForm from '../components/InformationForm';
import NationalitySelect from '../components/NationalitySelect';
import PasswordForm from '../components/PasswordForm';

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: RegistrationParams) => void
}

export default function LegalEntity({ onSubmit }: IProps) {
  const [formGroupDirection] = useState<'horizontal'>('horizontal');
  const { handleSubmit, control } = useFormContext<RegistrationParams>();

  return (
    <Section bg="white">
      <HeaderSection>
        <TitleSection>Cadastro Pessoa Jurídica</TitleSection>
      </HeaderSection>

      <FormGrid noValidate onSubmit={handleSubmit(onSubmit)}>
        <InformationForm formGroupDirection={formGroupDirection}>
          <FormGroup
            direction={formGroupDirection}
            label={{
              forId: 'social-name',
              title: 'Razão Social',
            }}
          >
            <Input
              id="social-name"
              placeholder="Carvalho & Nair LTDA"
            />
          </FormGroup>

          <Controller
            name="cnpj"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormGroup
                direction={formGroupDirection}
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
    </Section>
  );
}
