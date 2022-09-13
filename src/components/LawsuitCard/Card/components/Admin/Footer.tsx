import type { ILawSuits } from '@type/index';
import { Link } from '@components/Button';
import { Actions } from '../../styled';
import { suitTranslation } from '../..';

interface IProps {
  lawsuit: ILawSuits
}

export default function FooterAdmin({ lawsuit }: IProps) {
  return (
    <Actions>
      <div>
        <Link href="/informacao" size="small-large" variant="secondary">
          Informação
        </Link>
        <Link href="/" size="small-large" variant="default">
          {suitTranslation[lawsuit.suit]}
        </Link>
      </div>
    </Actions>
  );
}
