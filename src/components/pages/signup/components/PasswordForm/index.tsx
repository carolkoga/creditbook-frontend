import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { useFormContext } from 'react-hook-form';
import { Fieldset } from '../Fieldset';

export default function PasswordForm({ formGroupDirection }: { formGroupDirection: 'vertical' | 'horizontal' }) {
  const { register, formState: { errors } } = useFormContext();

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
        label={{
          forId: 'password',
          title: 'Senha',
        }}
      >
        <Input
          type="password"
          id="password"
          autoComplete="disabled"
          placeholder="***********"
          {...registeredFields.password}
        />
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
          placeholder="***********"
          autoComplete="disabled"
          {...registeredFields.passwordConfirmation}
        />
      </FormGroup>
    </Fieldset>
  );
}
