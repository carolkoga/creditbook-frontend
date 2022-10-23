import { Link } from '@components/Button';
import { CommonPropsTypes } from '..';
import { Actions, Content } from '../styled';

export default function LoggedFooter({ lawsuitId }: Pick<CommonPropsTypes, 'lawsuitId'>) {
  return (
    <Actions>
      <Content>
        <Link href={`/in/ads/${lawsuitId}`} size="small-large" variant="secondary">
          Informação
        </Link>
        <Link href={`/in/contact-announcer/announcement/${lawsuitId}`} size="small-large" variant="default">
          Comprar
        </Link>
      </Content>
    </Actions>
  );
}
