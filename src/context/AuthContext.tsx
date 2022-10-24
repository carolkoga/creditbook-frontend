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
import Loader from '@components/Loader';

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
      const response = await authCreditBookService.multipleLogin(data);

      const { token, user: userSignIn } = response.data;
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      if (
        (Router.asPath === '/login'
        && userSignIn.role === 'user'
        && !Router.asPath.startsWith('/in'))
        || Router.asPath === '/') {
        Router.push('/in/home');
      } else if (Router.asPath === '/login' && userSignIn.role === 'admin' && !Router.asPath.startsWith('/admin')) {
        Router.push('/admin/dashboard');
      } else {
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
    } catch (error) {
      toast.update(toastId, {
        render: 'Verifique suas credenciais', type: 'error', isLoading: false, ...customToastProps,
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
    if (userDataSaved) {
      setUser(JSON.parse(userDataSaved));
      if (token) {
        const { data } = await userCreditbookService.getUserInformation({ token });
        setUser({ ...data, password: undefined });
      }
    } else {
      handleSignOut();
    }
  }

  useEffect(() => {
    if (Router.pathname === '/login' || Router.pathname.startsWith('/in/')) {
      const { 'nextauth.token': nextAuthToken } = parseCookies();
      if (nextAuthToken) {
        getUserInformation(nextAuthToken);
        setAuthorizationHeader(nextAuthToken);
      } else {
        setUser(null);
        destroyAuthCookies();
      }
    }
  }, [Router.pathname]);

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
      <Loader loading={isLoading} />
    </AuthContext.Provider>
  );
}
