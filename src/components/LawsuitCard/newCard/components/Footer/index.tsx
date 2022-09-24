import FooterNotLogged from '@components/LawsuitCard/Card/components/NotLogged/Footer';
import useAuth from '@hooks/useAuth';
import LoggedFooter from './Logged';
import OwnedInBatch from './OwnedInBatch';
import OwnedNoBatch from './OwnedNoBatch';

export interface CommonPropsTypes {
  batchId: string | undefined | null,
  lawsuitId: string,
}

interface IProps extends CommonPropsTypes {
  mine: boolean,
}

export default function Footer({ mine, batchId, lawsuitId }: IProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <FooterNotLogged />;
  }

  return (
    <>
      {(mine && !batchId) && <OwnedNoBatch lawsuitId={lawsuitId} batchId={batchId} />}
      {(mine && batchId) && <OwnedInBatch lawsuitId={lawsuitId} batchId={batchId} />}
      {(!mine && isAuthenticated) && <LoggedFooter lawsuitId={lawsuitId} />}
    </>
  );
}
