import { Button } from '@components/Button';
import { Direction } from '@components/Direction';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import CheckboxShownPassword from '@components/UserForm/components/CheckboxShownPassword';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormLayout } from '../styled';
import { CommonPropsType } from '../types';

interface Passwords {
  password: 'password' | 'text',
  confirm: 'password' | 'text',
}

export function PasswordForm({ isDisabled, isLoading, onSubmit }: CommonPropsType) {
  const { register, formState: { errors } } = useFormContext();
  const [passwords, setPasswords] = useState<Passwords>({ password: 'password', confirm: 'password' });

  function handleToggleIsShownPassword() {
    setPasswords((oldPasswords) => ({
      ...oldPasswords,
      password: oldPasswords.password === 'text'
        ? 'password'
        : 'text',
    }));
  }

  function handleToggleIsShownConfirmPassword() {
    setPasswords((oldPasswords) => ({
      ...oldPasswords,
      confirm: oldPasswords.confirm === 'text'
        ? 'password'
        : 'text',
    }));
  }

  return (
    <FormLayout noValidate onSubmit={onSubmit}>
      <Direction>
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
            type={passwords.password}
            id="new-password"
          />
        </FormGroup>
        <CheckboxShownPassword
          onToggleShownPassword={handleToggleIsShownPassword}
          isShownPassword={passwords.password}
        />
      </Direction>

      <Direction>
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
            type={passwords.confirm}
            id="confirm-password"
          />
        </FormGroup>
        <CheckboxShownPassword
          onToggleShownPassword={handleToggleIsShownConfirmPassword}
          isShownPassword={passwords.confirm}
        />
      </Direction>

      <div className="actions">
        <Button size="large" type="submit" disabled={isDisabled} isLoading={isLoading}>
          {!isLoading && 'Redefinir Senha'}
          {isLoading && 'Redefinindo Senha'}
        </Button>
      </div>
    </FormLayout>
  );
}
