import { Link } from '@components/Button';
import { Actions } from '../../styled';

export default function FooterLogged() {
  return (
    <Actions>
      <div>
        <Link href="/informacao" size="small-large" variant="secondary">
          Informação
        </Link>
        <Link href="/" size="small-large" variant="default">
          Comprar
        </Link>
      </div>
    </Actions>
  );
}
