/* eslint-disable max-len */
import { BatchParams } from '@type/creditbook/Batch';
import convertToCurrency from '@utils/convertToCurrency';
import { Link } from '@components/Button';
import {
  Container,
  LeftContent,
  Title,
  QuantityADS,
  RightContent,
  BatchIncome,
} from './styled';

interface IProps {
  mine: boolean,
  batch: BatchParams,
  admin?: boolean
}

export function BatchCard({ mine, batch, admin = false }: IProps) {
  return (
    <Container>
      <LeftContent>
        <Title>
          {batch.name}
        </Title>

        <QuantityADS>Quantidade de anúncios: {batch.announcementQuantity || 0}</QuantityADS>
      </LeftContent>

      <RightContent>
        <BatchIncome>
          Valor da liquidação
          <span>
            {' '}
            {convertToCurrency(Number(batch.value))}
          </span>
        </BatchIncome>

        <div
          className="actions"
          style={{
            width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '10px',
          }}
        >
          {(!mine && !admin) && (
          <Link href={`/in/contact-announcer/${batch.id}?type=batch`}>
            Comprar
          </Link>
          )}
          {(!mine && !admin) && <Link href={`/in/batches/about/${batch.id}`} variant="secondary">Informações</Link>}
          {mine && <Link href={`/in/batches/${batch.id}`}>Ver Anúncios</Link>}
        </div>
      </RightContent>
    </Container>
  );
}
