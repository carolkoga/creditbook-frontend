import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast, ToastOptions } from 'react-toastify';

import { Button } from '@components/Button';
import LegalEntity, { CorporationParams } from '@components/UserForm/LegalEntity';
import PrivateIndividual, { PersonParams } from '@components/UserForm/PrivateIndividual';

import { Direction } from '@styles/pages/home';
import { Section } from '@components/Section';
import { authCreditBookService } from '@services/creditbook/auth';
import { AccountTypes } from '@type/creditbook';
import useDimensions from '@hooks/useDimensions';
import useAuth from 'hooks/useAuth';
import { commonToastProps } from '@configs/toast';

const commonToastPropsToSignUp: ToastOptions = {
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

  function handleCatchErrorRequest(error: AxiosError) {
    if (error?.response?.status === 0) {
      toast.error('Aconteceu algum erro no nosso servidor, aguarde um momento até resolvermos!', commonToastPropsToSignUp);
    }

    if (typeof error?.response?.status === 'number') {
      if (error?.response?.status >= 400 && error?.response?.status <= 499) {
        toast.warning('Verifique se não há nenhum dado errado.', commonToastPropsToSignUp);
      }
    }
  }

  async function handleSignUpPersonAccount(data: PersonParams) {
    try {
      setIsLoading(true);
      await authCreditBookService.register<'person'>({ ...data, type: 'person' });
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

  async function handleSignUpCorporationAccount(data: CorporationParams) {
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
          onSubmit={handleSignUpPersonAccount}
          loading={isLoading}
          formGroupDirection={widthOverlimit ? 'horizontal' : 'vertical'}
        />
      )}

      {registerAccountType === 'corporation' && (
        <LegalEntity
          onSubmit={handleSignUpCorporationAccount}
          loading={isLoading}
          formGroupDirection={widthOverlimit ? 'horizontal' : 'vertical'}
        />
      )}
    </>
  );
}
