import { Link } from '@components/Button';
import { CommonPropsTypes } from '..';
import { Actions, Content } from '../styled';

export default function OwnedInBatch({ batchId, lawsuitId }: CommonPropsTypes) {
  return (
    <Actions>
      <Content>
        <Link href={`/in/ads/${lawsuitId}`} size="small-large" variant="secondary">
          Informação
        </Link>
        <Link href={`/in/batch/${batchId}`} size="small-large" variant="default">
          Lote 1
        </Link>
      </Content>
    </Actions>
  );
}
