import { AxiosError } from 'axios';
import { toast, ToastOptions } from 'react-toastify';
import { commonToastProps } from '@configs/toast';

interface ErrorResponse {
  error: string,
}

export function handleCatchErrorRequest(
  error: AxiosError<ErrorResponse>,
  customToast?: ToastOptions | null,
) {
  if (error?.response?.status === 0 || error?.response?.status === 500) {
    toast.error('Aconteceu algum erro no nosso servidor, aguarde um momento até resolvermos!', customToast ?? commonToastProps);
  }

  if (typeof error?.response?.status === 'number') {
    if (error?.response?.data?.error.toLowerCase() === 'invalid param: email or password') {
      return toast.error('Verifique a sua senha ou e-mail foi inserido corretamente');
    }

    if (error?.response?.data?.error.toLowerCase() === 'user is invactive') {
      return toast.error('A sua conta está desativada. Entre em contato com suporte para saber mais sobre.');
    }

    if (error?.response?.status >= 400 && error?.response?.status <= 499) {
      toast.warning('Verifique se não há nenhum dado errado.', customToast ?? commonToastProps);
    }
  }
}
