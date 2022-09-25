// import { EmailForm } from '@components/pages/resetpassword/EmailForm';
import { Direction } from '@components/Direction';
import { EmailForm } from '@components/pages/resetpassword/EmailForm';
import { PasswordForm } from '@components/pages/resetpassword/PasswordForm';
import { Section } from '@components/Section';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmailFormValidationSchema, PasswordFormValidationSchema } from '@validations/yup/ResetPassword';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type EmailFormParam = { email: string };
type PassowordFormParam = { newPassword: string, confirmPassword: string };

export default function ResetPssword() {
  const [formStep] = useState<1 | 2>(2);
  const [loading] = useState(true);
  const methods = useForm<any>({
    resolver: yupResolver(
      formStep === 2
        ? PasswordFormValidationSchema : EmailFormValidationSchema,
    ),
    mode: 'all',
  });
  const { handleSubmit, formState: { isValid } } = methods;

  function handleVerifyEmail({ email }: EmailFormParam) {
    console.log({ email });
  }

  function handleResetPassword({ newPassword, confirmPassword }: PassowordFormParam) {
    console.log({ newPassword, confirmPassword });
  }

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
