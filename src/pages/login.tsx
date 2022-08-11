import { Button } from '@components/Button/styled';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { HeaderSection, Section, TitleSection } from '@styles/pages/home';
import { WrapperForm } from '@styles/pages/login';
import Link from 'next/link';

export default function Login() {
  return (
    <Section as="main">
      <HeaderSection style={{ margin: 'auto' }}>
        <TitleSection as="h1">Entrar</TitleSection>
      </HeaderSection>

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
    </Section>
  );
}
