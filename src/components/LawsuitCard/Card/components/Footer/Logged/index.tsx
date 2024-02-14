import { Link } from '@components/Button';
import { CommonPropsTypes } from '..';
import { Actions, Content } from '../styled';

export default function LoggedFooter({ lawsuitId, batchId }: CommonPropsTypes) {
  return (
    <Actions>
      <Content>
        <Link legacyBehavior href={`/in/ads/${lawsuitId}`} size="small-large" variant="secondary">
          Informações
        </Link>

        {!batchId && (
          <Link
            legacyBehavior
            href={`/in/contact-announcer/${lawsuitId}?type=announcement`}
            size="small-large"
            variant="default"
          >
            Negociar
          </Link>
        )}

        {batchId && (
          <Link
            legacyBehavior
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
