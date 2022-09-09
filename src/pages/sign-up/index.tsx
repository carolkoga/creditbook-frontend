import { useState } from 'react';

import { Button } from '@components/Button/styled';
import LegalEntity, { CorporationParams } from '@components/pages/signup/LegalEntity';
import PrivateIndividual, { PersonParams } from '@components/pages/signup/PrivateIndividual';

import { Direction } from '@styles/pages/home';
import { Section } from '@components/Section';
import AuthCreditbookService from '@services/creditbook/auth';
import { AccountTypes } from '@services/creditbook/auth/types';
import useDimensions from 'app/hooks/useDimensions';

export default function SignUp() {
  const [registerAccountType, setRegisterAccountType] = useState<AccountTypes>('person');
  const { dimensionsOverlimit } = useDimensions();
  const { widthOverlimit } = dimensionsOverlimit(870);

  function handleToggleRegisterAccountType() {
    setRegisterAccountType((oldState) => (oldState === 'person' ? 'corporation' : 'person'));
  }

  async function handleSignUpPersonAccount(data: PersonParams) {
    console.log({ before: data });
    await AuthCreditbookService.register({ ...data, type: 'person' });
  }

  async function handleSignUpCorporationAccount(data: CorporationParams) {
    console.log({ before: data });
    await AuthCreditbookService.register({ ...data, type: 'corporation' });
    const response = await AuthCreditbookService.login({
      email: data.email,
      password: data.password,
    });

    console.log({ response });
  }

  return (
    <>
      <Section.Header>
        <Direction>
          <Section.Title as="h2" textColor="dark">Cadastro</Section.Title>
          <Button type="button" onClick={() => handleToggleRegisterAccountType()}>
            Cadastrar pessoa
            {' '}
            {registerAccountType === 'person' ? 'jurídica' : 'física'}
          </Button>
        </Direction>
      </Section.Header>

      {registerAccountType === 'person' && (
        <PrivateIndividual
          onSubmit={handleSignUpPersonAccount}
          formGroupDirection={widthOverlimit ? 'horizontal' : 'vertical'}
        />
      )}

      {registerAccountType === 'corporation' && (
        <LegalEntity
          onSubmit={handleSignUpCorporationAccount}
          formGroupDirection={widthOverlimit ? 'horizontal' : 'vertical'}
        />
      )}
    </>
  );
}
