import Link from 'next/link';
import { Button } from '@components/Button/styled';
import { Actions } from '../../styled';

export default function FooterNotLogged() {
  return (
    <Actions>
      <div>
        <Link href="/informacao" color="secondary">
          <Button as="a" size="small-large" variant="secondary">
            Cadastrar
          </Button>
        </Link>
        <Link href="/">
          <Button as="a" size="small-large" variant="default">
            Entrar
          </Button>
        </Link>
      </div>

      <span>
        Faça o cadastro para obter mais informações
      </span>
    </Actions>
  );
}
