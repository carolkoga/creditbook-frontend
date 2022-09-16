import { AxiosError } from 'axios';
import { toast, ToastOptions } from 'react-toastify';
import { commonToastProps } from '@configs/toast';

export function handleCatchErrorRequest(error: AxiosError, customToast?: ToastOptions | null) {
  if (error?.response?.status === 0) {
    toast.error('Aconteceu algum erro no nosso servidor, aguarde um momento até resolvermos!', customToast ?? commonToastProps);
  }

  if (typeof error?.response?.status === 'number') {
    if (error?.response?.status >= 400 && error?.response?.status <= 499) {
      toast.warning('Verifique se não há nenhum dado errado.', customToast ?? commonToastProps);
    }
  }
}
