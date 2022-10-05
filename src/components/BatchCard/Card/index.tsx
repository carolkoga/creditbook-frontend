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
        <QuantityADS>Quantidade de anúncios: 5</QuantityADS>
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
          <Link href={`/batch/${batch.id}`} variant="secondary">Ver Anuncios</Link>
          {mine && <Link href={`/batch/${batch.id}`}>Adicionar Anúncios</Link>}
        </div>
      </RightContent>
    </Container>
  );
}
