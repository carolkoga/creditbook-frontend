import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@components/Button/styled';
import LegalEntity from '@components/pages/signup/LegalEntity';
import PrivateIndividual from '@components/pages/signup/PrivateIndividual';

import { Direction } from '@styles/pages/home';
import { Section } from '@components/Section';
import { registerLegalEntitySchema, registerPrivateIndividualSchema } from 'app/validations/yup/signup';
import { RegistrationParams } from '@services/creditbook/auth/types';
import AuthCreditBookService from '@services/creditbook/auth';

export default function SignUp() {
  const [registerPersonType, setRegisterPersonType] = useState<'privateIndividual' | 'legalEntity'>('privateIndividual');

  const methods = useForm<RegistrationParams>({
    resolver: yupResolver(
      registerPersonType === 'legalEntity'
        ? registerLegalEntitySchema
        : registerPrivateIndividualSchema,
    ),
    reValidateMode: 'onBlur',
    mode: 'all',
  });

  function handleToggleRegisterPersonType() {
    setRegisterPersonType((oldState) => (oldState === 'privateIndividual' ? 'legalEntity' : 'privateIndividual'));
  }

  async function handleSubmitRegisterToPrivateIndividual(data: RegistrationParams) {
    await AuthCreditBookService.register(data, 'person');
  }

  async function handleSubmitRegisterToLegalEntity(data: RegistrationParams) {
    await AuthCreditBookService.register(data, 'person');
  }

  return (
    <FormProvider {...methods}>
      <Section.Header>
        <Direction>
          <Section.Title as="h2" textColor="dark">Cadastro</Section.Title>
          <Button type="button" onClick={() => handleToggleRegisterPersonType()}>
            Cadastrar pessoa
            {' '}
            {registerPersonType === 'privateIndividual' ? 'jurídica' : 'física'}
          </Button>
        </Direction>
      </Section.Header>

      {registerPersonType === 'privateIndividual' && (
        <PrivateIndividual
          onSubmit={handleSubmitRegisterToPrivateIndividual}
        />
      )}

      {registerPersonType === 'legalEntity' && (
        <LegalEntity
          onSubmit={handleSubmitRegisterToLegalEntity}
        />
      )}
    </FormProvider>
  );
}
