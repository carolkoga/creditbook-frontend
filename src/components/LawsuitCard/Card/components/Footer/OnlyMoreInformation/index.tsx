import { Link } from '@components/Button';

import { AnnouncementStatus } from '@type/creditbook';

import { Actions, Content } from '../styled';
import { CommonPropsTypes } from '..';

interface IProps extends Pick<CommonPropsTypes, 'lawsuitId'> {
  status: AnnouncementStatus
}

export default function OnlyMoreInformation({ lawsuitId, status }: IProps) {
  if (status === 'edition_requested' || status === 'rejected') {
    return (
      <Actions>
        <Content>
          <Link href={`/in/ads/edit/${lawsuitId}`} size="small-large" variant="secondary">
            Informação
          </Link>
        </Content>
      </Actions>
    );
  }

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
