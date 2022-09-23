import { Link } from '@components/Button';
import { Actions, Content } from '../styled';

export default function LoggedFooter() {
  return (
    <Actions>
      <Content>
        <Link href="/ads/132312-13213-321131" size="small-large" variant="secondary">
          Informação
        </Link>
        <Link href="/ads/buy/12313546-1351584-1323" size="small-large" variant="default">
          Comprar
        </Link>
      </Content>
    </Actions>
  );
}
