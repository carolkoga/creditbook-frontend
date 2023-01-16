import { Direction } from '@components/Direction';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { AllCommonType } from '@components/UserForm/types';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import CheckboxShownPassword from '../CheckboxShownPassword';
import { Fieldset } from '../Fieldset';

export default function PasswordForm({ formGroupDirection }: AllCommonType) {
  const { register, formState: { errors } } = useFormContext();
  const [shownPassword, setShownPassword] = useState<'text' | 'password'>('password');

  const registeredFields = {
    password: register('password', {
      required: 'Campo obrigatório',
    }),

    passwordConfirmation: register('passwordConfirmation', {
      required: 'Campo obrigatório',
    }),
  };

  return (
    <Fieldset vertical>
      <div className="header">
        <legend>Senha</legend>
        <span>Pelo menos 8 caracteres com números, letra maiúscula e símbolo.</span>
      </div>

      <FormGroup
        direction={formGroupDirection}
        error={errors?.password?.message}
        alignCenter
        label={{
          forId: 'password',
          title: 'Senha',
        }}
      >
        <Direction justifyContent="center" alignItems="flex-start">
          <Input
            type={shownPassword}
            id="password"
            autoComplete="disabled"
            placeholder=" "
            {...registeredFields.password}
          />
          <CheckboxShownPassword
            isShownPassword={shownPassword}
            onToggleShownPassword={setShownPassword}
          />
        </Direction>
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        error={errors?.passwordConfirmation?.message}
        label={{
          forId: 'confirm-password',
          title: 'Confirmar senha',
        }}
      >
        <Input
          type="password"
          id="confirm-password"
          placeholder=" "
          autoComplete="disabled"
          {...registeredFields.passwordConfirmation}
        />
      </FormGroup>
    </Fieldset>
  );
}
