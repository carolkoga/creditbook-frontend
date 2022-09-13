import { useState } from 'react';

import { Button } from '@components/Button';
import LegalEntity, { CorporationParams } from '@components/pages/signup/LegalEntity';
import PrivateIndividual, { PersonParams } from '@components/pages/signup/PrivateIndividual';

import { Direction } from '@styles/pages/home';
import { Section } from '@components/Section';
import { authCreditBookService } from '@services/creditbook/auth';
import { AccountTypes } from '@type/creditbook';
import useDimensions from '@hooks/useDimensions';
import useAuth from 'hooks/useAuth';

export default function SignUp() {
  const [registerAccountType, setRegisterAccountType] = useState<AccountTypes>('person');
  const { handleSignIn } = useAuth();
  const { dimensionsOverlimit } = useDimensions();
  const { widthOverlimit } = dimensionsOverlimit(870);

  function handleToggleRegisterAccountType() {
    setRegisterAccountType((oldState) => (oldState === 'person' ? 'corporation' : 'person'));
  }

  async function handleSignUpPersonAccount(data: PersonParams) {
    try {
      console.log({ data });
      await authCreditBookService.register<'person'>({ ...data, type: 'person' });
      await handleSignIn({
        email: data.email,
        password: data.password,
      });
    } catch {
      console.debug('opz');
    }
  }

  async function handleSignUpCorporationAccount(data: CorporationParams) {
    try {
      await authCreditBookService.register<'corporation'>({ ...data, type: 'corporation' });
      await handleSignIn({
        email: data.email,
        password: data.password,
      });
    } catch {
      console.log('opz');
    }
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
