import { Direction } from '@components/Direction';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { AllCommonType } from '@components/UserForm/types';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import CheckboxShownPassword from '../CheckboxShownPassword';
import { Fieldset } from '../Fieldset';

export default function UpdatePasswordForm({ formGroupDirection }: AllCommonType) {
  const { register, formState: { errors } } = useFormContext();
  const [shownPassword, setShownPassword] = useState<'text' | 'password'>('password');

  const registeredFields = {
    currentPassword: register('currentPassword'),

    newPassword: register('newPassword'),
  };

  return (
    <Fieldset vertical>
      <div className="header">
        <legend>Senha</legend>
        <span>Pelo menos 8 caracteres com números, letra maiúscula e símbolo.</span>
      </div>

      <FormGroup
        direction={formGroupDirection}
        error={errors?.currentPassword?.message}
        alignCenter
        label={{
          forId: 'current-password',
          title: 'Senha Atual',
        }}
      >
        <Direction justifyContent="center" alignItems="flex-start">
          <Input
            type={shownPassword}
            id="current-password"
            autoComplete="disabled"
            placeholder=" "
            defaultValue=""
            {...registeredFields.currentPassword}
          />

          <CheckboxShownPassword
            isShownPassword={shownPassword}
            onToggleShownPassword={setShownPassword}
          />
        </Direction>
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
        error={errors?.newPassword?.message}
        label={{
          forId: 'new-password',
          title: 'Nova Senha',
        }}
      >
        <Input
          type="password"
          id="new-password"
          placeholder=" "
          autoComplete="disabled"
          {...registeredFields.newPassword}
        />
      </FormGroup>
    </Fieldset>
  );
}
