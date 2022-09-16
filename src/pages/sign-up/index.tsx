import { useState } from 'react';
import { AxiosError } from 'axios';
import { ToastOptions } from 'react-toastify';

import { Button } from '@components/Button';
import LegalEntity from '@components/UserForm/LegalEntity';
import PrivateIndividual from '@components/UserForm/PrivateIndividual';

import { Direction } from '@styles/pages/home';
import { Section } from '@components/Section';
import { authCreditBookService } from '@services/creditbook/auth';
import { AccountTypes } from '@type/creditbook';
import useDimensions from '@hooks/useDimensions';
import useAuth from 'hooks/useAuth';
import { commonToastProps } from '@configs/toast';
import { AccountCorporation, AccountPerson } from '@type/creditbook/auth/register';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';

const customToastPropsToSignUp: ToastOptions = {
  ...commonToastProps,
  position: 'top-right',
};

export default function SignUp() {
  const [registerAccountType, setRegisterAccountType] = useState<AccountTypes>('person');
  const [isLoading, setIsLoading] = useState(false);
  const { handleSignIn } = useAuth();
  const { dimensionsOverlimit } = useDimensions();
  const { widthOverlimit } = dimensionsOverlimit(870);

  function handleToggleRegisterAccountType() {
    setRegisterAccountType((oldState) => (oldState === 'person' ? 'corporation' : 'person'));
  }

  async function handleSignUpPersonAccount(data: AccountPerson) {
    try {
      setIsLoading(true);
      await authCreditBookService.register<'person'>({ ...data, type: 'person' });
      setIsLoading(false);
      await handleSignIn({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      handleCatchErrorRequest(error as AxiosError, customToastPropsToSignUp);
      setIsLoading(false);
    }
  }

  async function handleSignUpCorporationAccount(data: AccountCorporation) {
    try {
      setIsLoading(true);

      await authCreditBookService.register<'corporation'>({ ...data, type: 'corporation' });
      setIsLoading(false);

      await handleSignIn({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      handleCatchErrorRequest(error as AxiosError);
      setIsLoading(false);
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
          validation="register"
          onSubmit={handleSignUpPersonAccount}
          loading={isLoading}
          formGroupDirection={widthOverlimit ? 'horizontal' : 'vertical'}
          label={isLoading ? 'Cadastrando' : 'Cadastrar'}
        />
      )}

      {registerAccountType === 'corporation' && (
        <LegalEntity
          validation="register"
          onSubmit={handleSignUpCorporationAccount}
          loading={isLoading}
          formGroupDirection={widthOverlimit ? 'horizontal' : 'vertical'}
          label={isLoading ? 'Cadastrando' : 'Cadastrar'}
        />
      )}
    </>
  );
}
