import { Link } from '@components/Button';
import { Actions, Content } from '../styled';

export default function OwnedInBatch() {
  return (
    <Actions>
      <Content>
        <Link href="/ads/13565-16516-15156" size="small-large" variant="secondary">
          Informação
        </Link>
        <Link href="/batch/13565-16516-15156" size="small-large" variant="default">
          Lote 1
        </Link>
      </Content>
    </Actions>
  );
}
