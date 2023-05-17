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
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';

interface IProps {
  children: ReactNode,
}

export const AuthContext = createContext({} as Omit<AuthContextType, 'token'>);

const customToastProps: ToastOptions = {
  ...commonToastProps,
  position: 'bottom-center',
};

export function destroyAuthCookies() {
  destroyCookie(undefined, 'nextauth.token', {
    path: '/',
  });

  destroyCookie(undefined, 'nextauth.user', {
    path: '/',
  });
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
    localStorage.removeItem('nextauth.token');
    destroyAuthCookies();
    Router.push('/');

    delete creditbookApi.defaults.headers.common.Authorization;
  }

  // function setAuthorizationHeader(token: string) {
  //   creditbookApi.interceptors.request.use((config) => {
  //     // eslint-disable-next-line no-param-reassign
  //     config.headers = {
  //       ...config.headers,
  //       Authorization: `Bearer ${token}`,
  //     };

  //     return config;
  //   }, (error) => {
  //     if (error.response.status === 401) {
  //       handleSignOut();
  //     }

  //     return Promise.reject(error);
  //   });

  //   creditbookApi.interceptors.response.use((response) => response, (error) => {
  //     if (error.response.status === 401) {
  //       handleSignOut();
  //     }

  //     return Promise.reject(error);
  //   });
  // }

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
      localStorage.setItem('nextauth.token', token);
      creditbookApi.defaults.headers.common.Authorization = `Bearer ${token}`;

      if (userSignIn.role === 'user') {
        Router.replace('/in/home');
      }

      if (userSignIn.role === 'admin') {
        Router.replace('/admin/dashboard');
      }

      setUser(userSignIn);
      // setAuthorizationHeader(token);

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
      handleCatchErrorRequest(error);

      toast.dismiss(toastId);
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
      // setAuthorizationHeader(nextAuthToken);
      creditbookApi.defaults.headers.common.Authorization = `Bearer ${nextAuthToken}`;
    } else {
      setUser(null);
      destroyAuthCookies();
      delete creditbookApi.defaults.headers.common.Authorization;
    }
  }, []);

  const values = useMemo(() => ({
    user: user as AuthenticatedUserData,
    isAuthenticated,
    handleSignIn,
    handleSignOut,
    handleUpdateUser: (data: AuthenticatedUserData) => updateUser(data),
  }), [isAuthenticated, user, updateUser, handleSignOut, handleSignIn]);

  return (
    <AuthContext.Provider value={values}>
      {children}
      <OverlayLoader loading={isLoading} />
    </AuthContext.Provider>
  );
}
