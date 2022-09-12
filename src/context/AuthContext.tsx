import {
  createContext, ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useRouter } from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { AuthContextType, AuthenticatedUserData } from '@type/creditbook/auth/authenticatedUser';
import { authCreditBookService } from '@services/creditbook/auth';
import { LoginParams } from '@type/creditbook/auth/login';
import { creditbookApi } from '@services/api/creditbookApi';

interface IProps {
  children: ReactNode,
}

export const AuthContext = createContext({} as Omit<AuthContextType, 'token'>);

export function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState<AuthenticatedUserData | null>(null);
  const Router = useRouter();
  const isAuthenticated = !!user;

  function handleSignOut() {
    destroyCookie(undefined, 'nextauth.token', {
      path: '/',
    });

    setUser(null);
    Router.push('/');
  }

  async function handleSignIn(data: LoginParams) {
    try {
      const response = await authCreditBookService.login(data);
      const { token, user: userSignIn } = response!.data;
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
      setUser(userSignIn);
      creditbookApi.defaults.headers.common.Authorization = `Bearer ${token}`;
      Router.replace('/logged/home');
    } catch {
      handleSignOut();
    }
  }

  const verifyIsAlreadyHaveAToken = useCallback(() => {
    async function getUserInformation(token: string) {
      try {
        const { data } = await creditbookApi.get('/user', {
          headers: {
            token: `Bearer ${token}`,
          },
        });

        setUser(data);
      } catch {
        handleSignOut();
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
  }), [isAuthenticated]);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
}
