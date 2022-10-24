import { Link } from '@components/Button';
import { BatchParams } from '@type/creditbook/Batch';
import convertToCurrency from '@utils/convertToCurrency';
import {
  Container,
  LeftContent,
  Title,
  Description,
  QuantityADS,
  RightContent,
  BatchIncome,
} from './styled';

interface IProps {
  mine: boolean,
  batch: BatchParams,
}

export function BatchCard({ mine, batch }: IProps) {
  return (
    <Container>
      <LeftContent>
        <Title>
          {batch.name}
        </Title>
        <Description>
          {batch.description}
        </Description>
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
        <div className="actions">
          {!mine && <Link href={`/in/batches/about/${batch.id}`} variant="secondary">Ver Anuncios</Link>}
          {mine && <Link href={`/in/batches/${batch.id}`}>Adicionar Anúncios</Link>}
        </div>
      </RightContent>
    </Container>
  );
}
