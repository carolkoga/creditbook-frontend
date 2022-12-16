import { Link } from '@components/Button';
import { CommonPropsTypes } from '..';
import { Actions, Content } from '../styled';

export default function LoggedFooter({ lawsuitId, batchId }: CommonPropsTypes) {
  return (
    <Actions>
      <Content>
        <Link href={`/in/ads/${lawsuitId}`} size="small-large" variant="secondary">
          Informação
        </Link>

        {!batchId && (
          <Link
            href={`/in/contact-announcer/${lawsuitId}?type=announcement`}
            size="small-large"
            variant="default"
          >
            Comprar
          </Link>
        )}

        {batchId && (
          <Link
            href={`/in/batches/about/${batchId}`}
            size="small-large"
            variant="default"
          >
            Ver Lote
          </Link>
        )}
      </Content>
    </Actions>
  );
}
