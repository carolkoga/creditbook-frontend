import Link from 'next/link';
import { Button } from '@components/Button/styled';
import { Actions } from '../../styled';

export default function FooterLogged() {
  return (
    <Actions>
      <div>
        <Link href="/informacao" color="secondary">
          <Button as="a" size="small-large" variant="secondary">
            Informação
          </Button>
        </Link>
        <Link href="/">
          <Button as="a" size="small-large" variant="default">
            Comprar
          </Button>
        </Link>
      </div>
    </Actions>
  );
}
