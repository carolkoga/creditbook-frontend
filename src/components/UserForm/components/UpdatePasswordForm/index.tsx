import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { AllCommonType } from '@components/UserForm/types';
import { useFormContext } from 'react-hook-form';
import { Fieldset } from '../Fieldset';

export default function UpdatePasswordForm({ formGroupDirection }: AllCommonType) {
  const { register, formState: { errors } } = useFormContext();

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
        label={{
          forId: 'current-password',
          title: 'Senha Atual',
        }}
      >
        <Input
          type="password"
          id="current-password"
          autoComplete="disabled"
          placeholder=" "
          {...registeredFields.currentPassword}
        />
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
