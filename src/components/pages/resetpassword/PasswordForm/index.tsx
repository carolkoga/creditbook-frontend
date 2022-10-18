import { Button } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { useFormContext } from 'react-hook-form';
import { FormLayout } from '../styled';
import { CommonPropsType } from '../types';

export function PasswordForm({ isDisabled, isLoading, onSubmit }: CommonPropsType) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <FormLayout noValidate onSubmit={onSubmit}>
      <FormGroup
        direction="vertical"
        error={errors?.newPassword?.message}
        label={{
          forId: 'new-password',
          title: 'Nova senha',
        }}
      >
        <Input
          {...register('newPassword')}
          type="password"
          id="new-password"
        />
      </FormGroup>

      <FormGroup
        direction="vertical"
        error={errors?.confirmPassword?.message}
        label={{
          forId: 'confirm-password',
          title: 'Confirme nova senha',
        }}
      >
        <Input
          {...register('newPasswordConfirmation')}
          type="password"
          id="confirm-password"
        />
      </FormGroup>

      <div className="actions">
        <Button size="large" disabled={isDisabled} isLoading={isLoading}>
          {!isLoading && 'Redefinir Senha'}
          {isLoading && 'Redefinindo Senha'}
        </Button>
      </div>
    </FormLayout>
  );
}
