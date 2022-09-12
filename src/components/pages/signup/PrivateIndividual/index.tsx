import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { RegistrationParams } from '@type/creditbook/auth/register';

import { Button } from '@components/Button/styled';
import { Section } from '@components/Section';

import { registerPersonAccountSchema } from 'app/validations/yup/signup';

import AddressForm from '../components/AddressForm';
import { FormGrid } from '../components/FormGrid';
import InformationForm from '../components/InformationForm';
import PasswordForm from '../components/PasswordForm';

export interface PersonParams extends Omit<RegistrationParams<'person'>, 'type'> {}

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: PersonParams) => void,
  formGroupDirection: 'horizontal' | 'vertical',
}

export default function PrivateIndividual({ onSubmit, formGroupDirection }: IProps) {
  const methods = useForm<PersonParams>({
    resolver: yupResolver(registerPersonAccountSchema),
    mode: 'all',
  });
  const { handleSubmit } = methods;

  return (
    <Section.Container bg="white">
      <Section.Header>
        <Section.Title as="h1">Cadastro Pessoa Física</Section.Title>
      </Section.Header>

      <FormProvider {...methods}>
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
      </FormProvider>

    </Section.Container>
  );
}
