import LinkNext from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Button, Link } from '@components/Button';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { Section } from '@components/Section';
import { WrapperForm } from '@styles/pages/login';
import useAuth from 'hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const { handleSignIn } = useAuth();
  const [password, setPassword] = useState('');
  const isValid = !email && !password;

  async function onSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await handleSignIn({ email, password });
  }

  function handleChangeEmail(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <Section.Container as="main">
      <Section.Header style={{ margin: 'auto' }}>
        <Section.Title as="h1">Entrar</Section.Title>
      </Section.Header>

      <WrapperForm>
        <form noValidate onSubmit={onSignIn}>
          <FormGroup label={{ title: 'E-mail', forId: 'email' }}>
            <Input
              type="email"
              placeholder="ex: tes@mail.com"
              id="email"
              value={email}
              onChange={handleChangeEmail}
            />
          </FormGroup>

          <FormGroup label={{ title: 'Senha', forId: 'password' }}>
            <Input
              type="password"
              placeholder="************"
              id="password"
              value={password}
              onChange={handleChangePassword}
            />
          </FormGroup>

          <Button
            type="submit"
            size="large"
            disabled={isValid}
          >
            Entrar
          </Button>
        </form>

        <div className="actions">
          <Link href="/sign-up" size="large" variant="white">
            Quero me cadastrar
          </Link>

          <LinkNext href="/">
            <a className="forget__password">
              Esqueci a minha senha
            </a>
          </LinkNext>
        </div>
      </WrapperForm>
    </Section.Container>
  );
}
