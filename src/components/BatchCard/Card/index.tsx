/* eslint-disable max-len */
import { BatchParams, batchLabel } from '@type/creditbook/Batch';
import convertToCurrency from '@utils/convertToCurrency';
import { Link } from '@components/Button';
import {
  Container,
  LeftContent,
  Title,
  QuantityADS,
  RightContent,
  BatchSmall,
} from './styled';

interface IProps {
  mine: boolean;
  batch: BatchParams;
  admin?: boolean;
}

export function BatchCard({ mine, batch, admin = false }: IProps) {
  return (
    <Container>
      <LeftContent>
        <Title>{batch.name}</Title>

        <QuantityADS>
          Quantidade de anúncios: {batch.announcementQuantity || 0}
        </QuantityADS>
        {mine && (
          <small style={{ opacity: '60%' }}>{batchLabel[batch.status]}</small>
        )}
      </LeftContent>

      <RightContent>
        <BatchSmall>
          Valor da liquidação
          <span> {convertToCurrency(Number(batch.value))}</span>
        </BatchSmall>

        <div
          className="actions"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
          }}
        >
          {!mine && !admin && (
            <Link
              legacyBehavior
              href={`/in/contact-announcer/${batch.id}?type=batch`}
            >
              Comprar Lote
            </Link>
          )}
          {!mine && !admin && (
            <Link
              legacyBehavior
              href={`/in/batches/about/${batch.id}`}
              variant="secondary"
            >
              Informações
            </Link>
          )}
          {mine && (
            <Link legacyBehavior href={`/in/batches/${batch.id}`}>
              Ver Anúncios
            </Link>
          )}
        </div>
      </RightContent>
    </Container>
  );
}
