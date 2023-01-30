import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastOptions } from 'react-toastify';

import { Button } from '@components/Button';
import LegalEntity from '@components/UserForm/LegalEntity';
import PrivateIndividual from '@components/UserForm/PrivateIndividual';

import { Section } from '@components/Section';

import useDimensions from '@hooks/useDimensions';

import { Direction } from '@styles/pages/home';

import { authCreditBookService } from '@services/creditbook/auth';

import { AccountTypes } from '@type/creditbook';
import { AccountCorporation, AccountPerson } from '@type/creditbook/auth/register';

import { commonToastProps } from '@configs/toast';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { registerCorporationAccountSchema, registerPersonAccountSchema } from '@validations/yup/UserForm';
import { useRouter } from 'next/router';

const customToastPropsToSignUp: ToastOptions = {
  ...commonToastProps,
  position: 'top-right',
};

export default function SignUp() {
  const router = useRouter();
  const [registerAccountType, setRegisterAccountType] = useState<AccountTypes>('person');
  const [isLoading, setIsLoading] = useState(false);
  const { dimensionsOverlimit } = useDimensions();
  const { widthOverlimit } = dimensionsOverlimit(870);
  const methodsPersonAccount = useForm<AccountPerson>({
    resolver: yupResolver(registerPersonAccountSchema),
    mode: 'onBlur',
  });

  const methodsCorporationAccount = useForm<AccountCorporation>({
    resolver: yupResolver(registerCorporationAccountSchema),
    mode: 'onBlur',
  });

  function handleToggleRegisterAccountType() {
    setRegisterAccountType((oldState) => (oldState === 'person' ? 'corporation' : 'person'));
  }

  async function handleSignUpPersonAccount(data: AccountPerson) {
    try {
      setIsLoading(true);

      await authCreditBookService.register({ ...data, type: 'person' });
      router.push('/login');
    } catch (error) {
      handleCatchErrorRequest(error as never, customToastPropsToSignUp);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignUpCorporationAccount(data: AccountCorporation) {
    try {
      setIsLoading(true);

      await authCreditBookService.register({ ...data, type: 'corporation' });
      router.push('/login');
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      setIsLoading(false);
    }
  }

  const continuingSignUpForm = useCallback(() => {
    methodsPersonAccount.reset({
      fullName: router.query?.name as string,
      cellphone: router.query?.cellphone as string,
      email: router.query?.email as string,
    });

    methodsCorporationAccount.reset({
      fullName: router.query?.name as string,
      cellphone: router.query?.cellphone as string,
      email: router.query?.email as string,
    });
  }, [router.query]);

  useEffect(() => {
    continuingSignUpForm();
  }, [continuingSignUpForm]);

  return (
    <>
      <Section.Header>
        <Direction>
          <Section.Title as="h2" textColor="dark">Cadastro</Section.Title>
          <Button type="button" onClick={() => handleToggleRegisterAccountType()}>
            Cadastre como pessoa
            {' '}
            {registerAccountType === 'person' ? 'jurídica' : 'física'}
          </Button>
        </Direction>
      </Section.Header>

      {registerAccountType === 'person' && (
        <FormProvider {...methodsPersonAccount}>
          <PrivateIndividual
            validation="register"
            onSubmit={methodsPersonAccount.handleSubmit(handleSignUpPersonAccount)}
            loading={isLoading}
            formGroupDirection={widthOverlimit ? 'horizontal' : 'vertical'}
            label={isLoading ? 'Cadastrando' : 'Cadastrar'}
          />
        </FormProvider>
      )}

      {registerAccountType === 'corporation' && (
        <FormProvider {...methodsCorporationAccount}>
          <LegalEntity
            validation="register"
            onSubmit={methodsCorporationAccount.handleSubmit(handleSignUpCorporationAccount)}
            loading={isLoading}
            formGroupDirection={widthOverlimit ? 'horizontal' : 'vertical'}
            label={isLoading ? 'Cadastrando' : 'Cadastrar'}
          />
        </FormProvider>
      )}
    </>
  );
}
