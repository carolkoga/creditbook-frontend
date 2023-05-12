import { Link } from '@components/Button';
import { CommonPropsTypes } from '..';
import { Actions, Content } from '../styled';

export default function OwnedInBatch({ batchId, lawsuitId }: CommonPropsTypes) {
  return (
    <Actions>
      <Content>
        <Link href={`/in/ads/${lawsuitId}`} size="small-large" variant="secondary">
          Informações
        </Link>
        <Link href={`/in/batches/${batchId}`} size="small-large" variant="default">
          Ver Lote
        </Link>
      </Content>
    </Actions>
  );
}
