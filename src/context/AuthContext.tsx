import {
  createContext, ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useRouter } from 'next/router';
import { toast, ToastOptions } from 'react-toastify';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { AuthContextType, AuthenticatedUserData } from '@type/creditbook/auth/authenticatedUser';
import { authCreditBookService } from '@services/creditbook/auth';
import { LoginParams } from '@type/creditbook/auth/login';
import { creditbookApi } from '@api/creditbookApi';
import { commonToastProps } from '@configs/toast';
import { userCreditbookService } from '@services/creditbook/user';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { AxiosError } from 'axios';

interface IProps {
  children: ReactNode,
}

export const AuthContext = createContext({} as Omit<AuthContextType, 'token'>);

const customToastProps: ToastOptions = {
  ...commonToastProps,
  position: 'bottom-center',
};

export function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState<AuthenticatedUserData | null>(null);
  const Router = useRouter();
  const isAuthenticated = !!user;

  function handleSignOut() {
    destroyCookie(undefined, 'nextauth.token', {
      path: '/',
    });

    Router.push('/');
    setUser(null);
  }

  async function handleSignIn(data: LoginParams) {
    try {
      const response = await toast.promise(
        authCreditBookService.login(data),
        {
          pending: 'Estamos verificando seus dados, aguarde um momento...',
          success: 'Login realizado com sucessso!',
          error: 'Ops. verifique e-mail e senha estão certo.',
        },
        customToastProps,
      );

      const { token, user: userSignIn } = response.data;

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      Router.push('/logged/home');

      creditbookApi.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(userSignIn);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.debug('...');
    }
  }

  function updateUser(data: any) {
    setUser((oldState) => Object.assign(data, oldState));
  }

  const verifyIsAlreadyHaveAToken = useCallback(() => {
    async function getUserInformation(token: string) {
      try {
        const { data } = await userCreditbookService.getUserInformation({ token });

        setUser(data);
      } catch (error) {
        handleCatchErrorRequest(error as AxiosError, customToastProps);
      }
    }

    if (Router.pathname === '/login' || Router.pathname.includes('logged')) {
      const { 'nextauth.token': nextAuthToken } = parseCookies();

      if (nextAuthToken) {
        getUserInformation(nextAuthToken);
        creditbookApi.defaults.headers.common.Authorization = `Bearer ${nextAuthToken}`;
      }
    } else {
      setUser(null);
    }
  }, [Router.pathname]);

  useEffect(() => {
    verifyIsAlreadyHaveAToken();
  }, [verifyIsAlreadyHaveAToken]);

  const values = useMemo(() => ({
    user: user as AuthenticatedUserData,
    isAuthenticated,
    handleSignIn,
    handleSignOut,
    handleUpdateUser: (data: AuthenticatedUserData) => updateUser(data),
  }), [isAuthenticated, user]);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
}
