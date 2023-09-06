import useAuth from '@hooks/useAuth';

import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { BatchParams } from '@type/creditbook/Batch';

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
  lawsuit: LawsuitParams,
  userBatches: BatchParams[],
  admin: boolean
}

export default function Footer({
  mine, lawsuit, originalBatchId, moreAboutOnly, userBatches, admin,
}: IProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <OnlyMoreInformation lawsuitId={lawsuit.id} status={lawsuit.status} />;
  }

  if (moreAboutOnly || (lawsuit?.status !== 'accepted' && mine)) {
    return <OnlyMoreInformation lawsuitId={lawsuit.id} status={lawsuit.status} />;
  }

  if (mine && originalBatchId) {
    return <BatchActionFooter originalBatchId={originalBatchId} originalLawsuit={lawsuit} />;
  }

  console.log(admin);

  return (
    <>
      {(mine && !lawsuit.batchId) && (
        <OwnedNoBatch lawsuitId={lawsuit.id} batchId={lawsuit.batchId} userBatches={userBatches} />
      )}

      {(mine && lawsuit.batchId) && (
        <OwnedInBatch lawsuitId={lawsuit.id} batchId={lawsuit.batchId} />
      )}

      {(!mine && isAuthenticated && !admin) && (
        <LoggedFooter lawsuitId={lawsuit.id} batchId={lawsuit.batchId} />)}

      {admin && (
        <OnlyMoreInformation lawsuitId={lawsuit.id} status={lawsuit.status} />)}
    </>
  );
}

Footer.defaultProps = {
  originalBatchId: '',
  moreAboutOnly: false,
};
