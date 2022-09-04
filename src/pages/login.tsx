import { Button } from '@components/Button/styled';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { Section } from '@components/Section';
import { WrapperForm } from '@styles/pages/login';
import Link from 'next/link';

export default function Login() {
  return (
    <Section.Container as="main">
      <Section.Header style={{ margin: 'auto' }}>
        <Section.Title as="h1">Entrar</Section.Title>
      </Section.Header>

      <WrapperForm>
        <form>
          <FormGroup label={{ title: 'E-mail', forId: 'email' }}>
            <Input type="email" placeholder="ex: credit@mail.com" id="email" />
          </FormGroup>

          <FormGroup label={{ title: 'Senha', forId: 'password' }}>
            <Input type="password" placeholder="************" id="password" />
          </FormGroup>

          <Button type="submit" size="large">Entrar</Button>
        </form>

        <div className="actions">
          <Link href="/sign-up">
            <Button as="a" type="submit" size="large" variant="white">
              Quero me cadastrar
            </Button>
          </Link>

          <Link href="/">
            <a className="forget__password">
              Esqueci a minha senha
            </a>
          </Link>
        </div>
      </WrapperForm>
    </Section.Container>
  );
}
