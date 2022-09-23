import { useRouter } from 'next/router';
import {
  createContext, ReactNode, useEffect, useMemo, useState,
} from 'react';
import { toast, ToastOptions } from 'react-toastify';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { AuthContextType, AuthenticatedUserData } from '@type/creditbook/auth/authenticatedUser';
import { authCreditBookService } from '@services/creditbook/auth';
import { LoginParams } from '@type/creditbook/auth/login';
import { creditbookApi } from '@api/creditbookApi';
import { commonToastProps } from '@configs/toast';

interface IProps {
  children: ReactNode,
}

export const AuthContext = createContext({} as Omit<AuthContextType, 'token'>);

const customToastProps: ToastOptions = {
  ...commonToastProps,
  position: 'bottom-center',
};

function setAuthorizationHeader(token: string) {
  creditbookApi.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState<AuthenticatedUserData | null>(null);
  const Router = useRouter();
  const isAuthenticated = !!user;

  function handleSignOut() {
    setUser(null);
    Router.push('/');
    destroyCookie(undefined, 'nextauth.token', {
      path: '/',
    });
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
      Router.push('/in/home');
      setUser(userSignIn);
      setAuthorizationHeader(token);

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setCookie(undefined, 'nextauth.user', JSON.stringify({ ...userSignIn, password: undefined }), {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.debug('...');
    }
  }

  function updateUser(data: any) {
    setUser((oldState) => Object.assign(data, oldState));
  }

  async function getUserInformation() {
    const { 'nextauth.user': userDataSaved } = parseCookies();
    if (userDataSaved) {
      setUser(JSON.parse(userDataSaved));
    } else {
      handleSignOut();
    }
  }

  useEffect(() => {
    if (Router.pathname === '/login' || Router.pathname.startsWith('/in/')) {
      const { 'nextauth.token': nextAuthToken } = parseCookies();
      if (nextAuthToken) {
        getUserInformation();
        setAuthorizationHeader(nextAuthToken);
      } else {
        setUser(null);
        destroyCookie(undefined, 'nextauth.token', {
          path: '/',
        });
      }
    }
  }, [Router.pathname]);

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
