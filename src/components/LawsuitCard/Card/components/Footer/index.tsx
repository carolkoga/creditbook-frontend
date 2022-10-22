import useAuth from '@hooks/useAuth';

import { LawsuitParams } from '@type/creditbook/Lawsuits';

import FooterNotLogged from './NotLogged';
import LoggedFooter from './Logged';
import OwnedInBatch from './OwnedInBatch';
import OwnedNoBatch from './OwnedNoBatch';
import AddToBatch from './AddToBatch';
import MoreInformationViewBatch from './MoreInformationViewBatch';

export interface CommonPropsTypes {
  batchId: string | undefined | null,
  lawsuitId: string,
}

interface IProps {
  mine: boolean,
  originalBatchId?: string,
  moreAboutOnly?: boolean,
  lawsuit: LawsuitParams
}

export default function Footer({
  mine, lawsuit, originalBatchId, moreAboutOnly,
}: IProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <FooterNotLogged />;
  }

  if (moreAboutOnly) {
    return <MoreInformationViewBatch lawsuitId={lawsuit.id} />;
  }

  if (mine && !lawsuit.batchId && originalBatchId) {
    return <AddToBatch originalBatchId={originalBatchId} originalLawsuit={lawsuit} />;
  }

  return (
    <>
      {(mine && !lawsuit.batchId) && (
        <OwnedNoBatch lawsuitId={lawsuit.id} batchId={lawsuit.batchId} />
      )}
      {(mine && lawsuit.batchId) && (
        <OwnedInBatch lawsuitId={lawsuit.id} batchId={lawsuit.batchId} />
      )}
      {(!mine && isAuthenticated) && <LoggedFooter lawsuitId={lawsuit.id} />}
    </>
  );
}

Footer.defaultProps = {
  originalBatchId: '',
  moreAboutOnly: false,
};
