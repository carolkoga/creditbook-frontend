import { useRouter } from 'next/router';
import {
  createContext, ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';
import { toast, ToastOptions } from 'react-toastify';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { AuthContextType, AuthenticatedUserData } from '@type/creditbook/auth/authenticatedUser';
import { authCreditBookService } from '@services/creditbook/auth';
import { LoginParams } from '@type/creditbook/auth/login';
import { creditbookApi } from '@api/creditbookApi';
import { commonToastProps } from '@configs/toast';
import { userCreditbookService } from '@services/creditbook/user';
import OverlayLoader from '@components/Loader/OverlayLoader';
import { AxiosResponse } from 'axios';

interface IProps {
  children: ReactNode,
}

export const AuthContext = createContext({} as Omit<AuthContextType, 'token'>);

const customToastProps: ToastOptions = {
  ...commonToastProps,
  position: 'bottom-center',
};

function destroyAuthCookies() {
  destroyCookie(undefined, 'nextauth.token', {
    path: '/',
  });

  destroyCookie(undefined, 'nextauth.user', {
    path: '/',
  });
}

function setAuthorizationHeader(token: string) {
  creditbookApi.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState<AuthenticatedUserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();
  const isAuthenticated = !!user;

  function handleAddCustomLoadingScreen() {
    Router.events.on('routeChangeStart', () => setIsLoading(true));
    Router.events.on('routeChangeComplete', () => setIsLoading(false));

    Router.events.off('routeChangeStart', () => setIsLoading(true));
    Router.events.off('routeChangeComplete', () => setIsLoading(false));
  }

  function handleSignOut() {
    handleAddCustomLoadingScreen();
    setUser(null);
    Router.push('/');
    destroyAuthCookies();
  }

  async function handleSignIn(data: LoginParams) {
    const toastId = toast.loading('Estamos verificando seus dados, aguarde um momento...', customToastProps);
    try {
      setIsLoading(true);
      handleAddCustomLoadingScreen();
      const response = await authCreditBookService.multipleLogin(data) as AxiosResponse;

      const { token, user: userSignIn } = response.data;
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      if (userSignIn.role === 'user') {
        if (Router.asPath === '/login') {
          Router.replace('/in/home');
        }

        if (Router.asPath !== '/login' || !Router.asPath.startsWith('/in') || !Router.pathname.startsWith('/in')) {
          Router.replace('/in/home');
        }

        Router.replace(Router.asPath);
      }

      if (userSignIn.role === 'admin') {
        if (Router.asPath === '/login') {
          Router.push('/admin/dashboard');
        }

        if (Router.asPath !== '/login' || !Router.asPath.startsWith('/admin') || !Router.pathname.startsWith('/admin')) {
          Router.push('/admin/dashboard');
        }

        Router.push(Router.asPath);
      }

      setUser(userSignIn);
      setAuthorizationHeader(token);

      setCookie(undefined, 'nextauth.user', JSON.stringify({
        ...userSignIn,
        password: undefined,
        role: userSignIn.role,
      }), {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
      toast.dismiss(toastId);
    } catch (error: any) {
      const message = error?.response?.data?.error?.toLowerCase() === 'user is inactive'
        ? 'A sua conta está desativada. Entre em contato com suporte para saber mais.'
        : 'Verifique suas credenciais';

      toast.update(toastId, {
        render: message, type: 'error', isLoading: false, ...customToastProps,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const updateUser = useCallback((data: any) => {
    setUser(data);
  }, [user]);

  async function getUserInformation(token?: string) {
    const { 'nextauth.user': userDataSaved } = parseCookies();
    if (!userDataSaved) return handleSignOut();
    setUser(JSON.parse(userDataSaved));
    if (!token) return handleSignOut();

    try {
      const { data } = await userCreditbookService.getUserInformation({ token });

      setUser({ ...data, password: undefined });
    } catch {
      handleSignOut();
    }
  }

  useEffect(() => {
    const { 'nextauth.token': nextAuthToken } = parseCookies();
    if (nextAuthToken) {
      getUserInformation(nextAuthToken);
      setAuthorizationHeader(nextAuthToken);
    } else {
      setUser(null);
      destroyAuthCookies();
    }
  }, []);

  const values = useMemo(() => ({
    user: user as AuthenticatedUserData,
    isAuthenticated,
    handleSignIn,
    handleSignOut,
    handleUpdateUser: (data: AuthenticatedUserData) => updateUser(data),
  }), [isAuthenticated, user, updateUser]);

  return (
    <AuthContext.Provider value={values}>
      {children}
      <OverlayLoader loading={isLoading} />
    </AuthContext.Provider>
  );
}
