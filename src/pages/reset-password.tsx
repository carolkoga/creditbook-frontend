// import { EmailForm } from '@components/pages/resetpassword/EmailForm';
import { Direction } from '@components/Direction';
import { EmailForm } from '@components/pages/resetpassword/EmailForm';
import { PasswordForm } from '@components/pages/resetpassword/PasswordForm';
import { Section } from '@components/Section';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordService } from '@services/creditbook/resetPassword';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { EmailFormValidationSchema, PasswordFormValidationSchema } from '@validations/yup/ResetPassword';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type EmailFormParam = { email: string };
type PasswordFormParam = { newPassword: string, newPasswordConfirmation: string };

export default function ResetPssword() {
  const router = useRouter();
  const [token, setToken] = useState<string>('');
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const methods = useForm<any>({
    resolver: yupResolver(
      formStep === 2
        ? PasswordFormValidationSchema : EmailFormValidationSchema,
    ),
    mode: 'all',
  });
  const { handleSubmit, formState: { isValid } } = methods;
  const listenQueryTokenToContinueResetPassword = useCallback(() => {
    const { token: queryToken } = router.query;
    if (queryToken) {
      setToken(queryToken as string);
      setFormStep(2);
    }
  }, [router.query]);

  async function handleVerifyEmail({ email }: EmailFormParam) {
    try {
      setLoading(true);
      await resetPasswordService.verifyCredentials({ email });
      toast.success('Verifique o seu e-mail para continuar!', { position: 'bottom-center' });
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(resetParams: PasswordFormParam) {
    try {
      setLoading(true);

      await resetPasswordService.resetPassword({ ...resetParams, token });
      toast.success('Senha alterada com sucesso!', { position: 'bottom-center' });
      setFormStep(1);
      router.push('/login');
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    listenQueryTokenToContinueResetPassword();
  }, [listenQueryTokenToContinueResetPassword]);

  return (
    <Direction alignItems="center">
      <Section.Header>
        <Section.Title>Redefinir Senha</Section.Title>
      </Section.Header>

      <FormProvider {...methods}>
        {(formStep === 1) && (
          <EmailForm
            isDisabled={!isValid}
            isLoading={loading}
            onSubmit={handleSubmit(handleVerifyEmail)}
          />
        )}

        {(formStep === 2) && (
          <PasswordForm
            isDisabled={!isValid}
            isLoading={loading}
            onSubmit={handleSubmit(handleResetPassword)}
          />
        )}
      </FormProvider>
    </Direction>
  );
}
