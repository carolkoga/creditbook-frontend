import { Link } from '@components/Button';
import { CommonPropsTypes } from '..';
import { Actions, Content } from '../styled';

export default function OwnedInBatch({ batchId }: CommonPropsTypes) {
  return (
    <Actions>
      <Content>
        <Link legacyBehavior href={`/in/batches/${batchId}`} size="small-large" variant="default">
          Ver anúncio do lote
        </Link>
      </Content>
    </Actions>
  );
}
