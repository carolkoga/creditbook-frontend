import { Link } from '@components/Button';
import { Actions } from '../../styled';

export default function FooterNotLogged() {
  return (
    <Actions>
      <div>
        <Link href="/informacao" size="small-large" variant="secondary">
          Cadastrar
        </Link>
        <Link href="/" size="small-large" variant="default">
          Entrar
        </Link>
      </div>

      <span>
        Faça o cadastro para obter mais informações
      </span>
    </Actions>
  );
}
