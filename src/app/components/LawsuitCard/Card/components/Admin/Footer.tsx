import type { ILawSuits } from '@type/index';
import Link from 'next/link';
import { Button } from '@components/Button/styled';
import { Actions } from '../../styled';

interface IProps {
  lawsuit: ILawSuits
}

export default function FooterAdmin({ lawsuit }: IProps) {
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
            {lawsuit.suit}
          </Button>
        </Link>
      </div>
    </Actions>
  );
}
