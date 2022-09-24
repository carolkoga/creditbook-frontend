import { Link } from '@components/Button';
import { Actions, Content } from '../styled';

export default function FooterNotLogged() {
  return (
    <Actions>
      <Content>
        <Link href="/informacao" size="small-large" variant="secondary">
          Cadastrar
        </Link>
        <Link href="/" size="small-large" variant="default">
          Entrar
        </Link>
      </Content>

      <small>
        Faça o cadastro para obter mais informações
      </small>
    </Actions>
  );
}
