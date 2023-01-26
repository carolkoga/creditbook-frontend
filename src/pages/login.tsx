import LinkNext from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Button, Link } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { Section } from '@components/Section';
import { WrapperForm } from '@styles/pages/login';
import useAuth from 'hooks/useAuth';
import CheckboxShownPassword from '@components/UserForm/components/CheckboxShownPassword';
import { Direction } from '@components/Direction';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleSignIn } = useAuth();
  const [password, setPassword] = useState('');
  const [shownPassword, setShownPassword] = useState<'text' | 'password'>('password');
  const isValid = !email.length && !password.length;

  async function onSignIn(event: FormEvent<HTMLFormElement>) {
    try {
      setLoading(true);
      event.preventDefault();

      await handleSignIn({ email, password });
    } finally {
      setLoading(false);
    }
  }

  function handleChangeEmail(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <Section.Container>
      <Section.Header style={{ margin: 'auto' }}>
        <Section.Title as="h1">Entrar</Section.Title>
      </Section.Header>

      <WrapperForm>
        <form noValidate onSubmit={onSignIn}>
          <FormGroup label={{ title: 'E-mail', forId: 'email' }}>
            <Input
              type="email"
              placeholder=" "
              id="email"
              value={email}
              onChange={handleChangeEmail}
            />
          </FormGroup>

          <FormGroup label={{ title: 'Senha', forId: 'password' }}>
            <Direction justifyContent="center" alignItems="flex-start">
              <Input
                type={shownPassword}
                placeholder=" "
                id="password"
                value={password}
                onChange={handleChangePassword}
              />
              <CheckboxShownPassword
                isShownPassword={shownPassword}
                onToggleShownPassword={setShownPassword}
              />
            </Direction>
          </FormGroup>

          <Button
            type="submit"
            size="large"
            disabled={isValid}
            isLoading={loading}
          >
            {loading && 'Entrando'}
            {!loading && 'Entrar'}
          </Button>
        </form>

        <div className="actions">
          <Link href="/sign-up" size="large" variant="white">
            Realize seu cadastro
          </Link>

          <LinkNext href="/reset-password">
            <a className="forget__password">
              Esqueci minha senha
            </a>
          </LinkNext>
        </div>
      </WrapperForm>
    </Section.Container>
  );
}
