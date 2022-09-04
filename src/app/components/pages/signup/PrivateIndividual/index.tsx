import { Button } from '@components/Button/styled';
import { RegistrationParams } from '@services/creditbook/auth/types';
import { Section } from '@components/Section';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import AddressForm from '../components/AddressForm';
import { FormGrid } from '../components/FormGrid';
import InformationForm from '../components/InformationForm';
import PasswordForm from '../components/PasswordForm';

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: RegistrationParams) => void
}

export default function PrivateIndividual({ onSubmit }: IProps) {
  const { handleSubmit } = useFormContext<RegistrationParams>();
  const [formGroupDirection] = useState<'horizontal'>('horizontal');

  return (
    <Section.Container bg="white">
      <Section.Header>
        <Section.Title as="h1">Cadastro Pessoa Física</Section.Title>
      </Section.Header>

      <FormGrid autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
        <InformationForm formGroupDirection={formGroupDirection} />
        <AddressForm formGroupDirection={formGroupDirection} />
        <PasswordForm formGroupDirection={formGroupDirection} />

        <div className="actions">
          <Button type="submit" size="outline-filled-round">
            Cadastrar
          </Button>
        </div>
      </FormGrid>
    </Section.Container>
  );
}
