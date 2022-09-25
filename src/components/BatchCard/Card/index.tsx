import { Link } from '@components/Button';
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
}

export function BatchCard({ mine }: IProps) {
  return (
    <Container>
      <LeftContent>
        <Title>
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </Title>
        <Description>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum itaque
          placeat magni voluptate temporibus iste nihil commodi, expedita, reiciendis
          inventore optio quas eveniet sit animi earum eaque ea repellat sint!
        </Description>
        <QuantityADS>Quantidade de anúncios: 5</QuantityADS>
      </LeftContent>

      <RightContent>
        <BatchIncome>
          Valor da liquidação
          <span>
            {' '}
            {convertToCurrency(18062135156)}
          </span>
        </BatchIncome>
        <div className="actions">
          <Link href="/batch/434124123" variant="secondary">Ver Anuncios</Link>
          {mine && <Link href="/batch/434124123">Adicionar Anúncios</Link>}
        </div>
      </RightContent>
    </Container>
  );
}
