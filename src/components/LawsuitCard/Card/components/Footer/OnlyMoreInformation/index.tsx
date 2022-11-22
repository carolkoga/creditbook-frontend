import { Link } from '@components/Button';

import { Actions, Content } from '../styled';
import { CommonPropsTypes } from '..';

interface IProps extends Pick<CommonPropsTypes, 'lawsuitId'> { }

export default function OnlyMoreInformation({ lawsuitId }: IProps) {
  return (
    <Actions>
      <Content>
        <Link href={`/in/ads/${lawsuitId}`} size="small-large" variant="secondary">
          Informação
        </Link>
      </Content>
    </Actions>
  );
}
