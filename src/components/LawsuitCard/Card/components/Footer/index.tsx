import useAuth from '@hooks/useAuth';

import { LawsuitParams } from '@type/creditbook/Lawsuits';

import FooterNotLogged from './NotLogged';
import LoggedFooter from './Logged';
import OwnedInBatch from './OwnedInBatch';
import OwnedNoBatch from './OwnedNoBatch';
import BatchActionFooter from './BatchActionFooter';
import OnlyMoreInformation from './OnlyMoreInformation';

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

  if (moreAboutOnly || lawsuit?.status !== 'accepted') {
    return <OnlyMoreInformation lawsuitId={lawsuit.id} />;
  }

  if (mine && originalBatchId) {
    return <BatchActionFooter originalBatchId={originalBatchId} originalLawsuit={lawsuit} />;
  }

  return (
    <>
      {(mine && !lawsuit.batchId) && (
        <OwnedNoBatch lawsuitId={lawsuit.id} batchId={lawsuit.batchId} />
      )}

      {(mine && lawsuit.batchId) && (
        <OwnedInBatch lawsuitId={lawsuit.id} batchId={lawsuit.batchId} />
      )}

      {(!mine && isAuthenticated) && (
        <LoggedFooter lawsuitId={lawsuit.id} batchId={lawsuit.batchId} />)}
    </>
  );
}

Footer.defaultProps = {
  originalBatchId: '',
  moreAboutOnly: false,
};
