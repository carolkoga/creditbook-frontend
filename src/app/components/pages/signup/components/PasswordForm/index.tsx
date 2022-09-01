import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { Fieldset } from '../Fieldset';

export default function PasswordForm({ formGroupDirection }: { formGroupDirection: 'vertical' | 'horizontal' }) {
  return (
    <Fieldset vertical>
      <div className="header">
        <legend>Senha</legend>
        <span>Pelo menos 8 caracteres com números, letra maiúscula e símbolo.</span>
      </div>

      <FormGroup
        direction={formGroupDirection}
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
        />
      </FormGroup>

      <FormGroup
        direction={formGroupDirection}
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
        />
      </FormGroup>
    </Fieldset>
  );
}
