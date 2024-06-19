/* eslint-disable operator-linebreak */
import { AxiosError } from 'axios';
import { toast, ToastOptions } from 'react-toastify';
import { commonToastProps } from '@components/configs/toast';

interface ErrorResponse {
  error: string;
}

const prefixErrorMessageParamInUse = 'param in use:';

export function handleCatchErrorRequest(
  error: AxiosError<ErrorResponse>,
  customToast?: ToastOptions | null
) {
  if (error?.response?.status === 0 || error?.response?.status === 500) {
    toast.error(
      'Aconteceu algum erro no nosso servidor, aguarde um momento até resolvermos!',
      customToast ?? commonToastProps
    );
  }

  if (typeof error?.response?.status === 'number') {
    if (error?.response?.data?.error?.toLowerCase() === 'account not exists') {
      return toast.info('Essa conta não existe', { position: 'bottom-center' });
    }

    if (
      error?.response?.data?.error?.toLowerCase() ===
      'aguardando confirmação de cadastro'
    ) {
      return toast.warn('Aguardando confirmação de cadastro', {
        position: 'bottom-center',
      });
    }

    if (error?.response?.data?.error?.toLowerCase() === 'user is inactive') {
      return toast.error(
        'A sua conta está desativada. Entre em contato com suporte para saber mais.'
      );
    }

    if (error?.response?.data?.error?.toLowerCase() === 'Batch length') {
      return toast.error('O numero minimo de anuncios para um lote é 2!');
    }

    if (
      error?.response?.data?.error?.toLowerCase() ===
      'invalid param: email or password'
    ) {
      return toast.error(
        'Verifique a sua senha ou e-mail foi inserido corretamente',
        { position: 'bottom-center' }
      );
    }

    if (error?.response?.status >= 400 && error?.response?.status <= 499) {
      if (error.response.status === 401) {
        return;
      }

      if (error.response.status === 403) {
        return toast.warn(
          'A sua conta não tem acesso necessário para essa requisição.'
        );
      }

      if (
        error?.response?.data?.error?.toLowerCase() ===
        `${prefixErrorMessageParamInUse} email`
      ) {
        return toast.error('O e-mail já está em uso');
      }

      if (
        error?.response?.data?.error?.toLowerCase() ===
        'selecione um método de pagamento'
      ) {
        return toast.error(
          'Selecione um método de pagamento para adicionar o premium ao seu anúncio'
        );
      }

      if (
        error?.response?.data?.error?.toLowerCase() ===
        `${prefixErrorMessageParamInUse} rg`
      ) {
        return toast.error('O RG já está em uso');
      }

      if (
        error?.response?.data?.error?.toLowerCase() ===
        `${prefixErrorMessageParamInUse} corporationName`
      ) {
        return toast.error('A razão social já está em uso');
      }

      if (
        error?.response?.data?.error?.toLowerCase() ===
          `${prefixErrorMessageParamInUse} cnpj` ||
        error?.response?.data?.error?.toLowerCase() ===
          `${prefixErrorMessageParamInUse} cpf`
      ) {
        return toast.error('O CPF ou CNPJ já está em uso');
      }

      if (
        error?.response?.data?.error?.toLowerCase() ===
        "you can't update your announcement plan yet, just after six months"
      ) {
        return toast.warning(
          'Você não pode atualizar o plano ainda, somente depois de 6 meses'
        );
      }

      toast.warning(
        'Verifique se não há nenhum dado errado.',
        customToast ?? commonToastProps
      );
    }
  }
}
