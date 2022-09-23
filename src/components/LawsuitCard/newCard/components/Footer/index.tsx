import FooterNotLogged from '@components/LawsuitCard/Card/components/NotLogged/Footer';
import useAuth from '@hooks/useAuth';
import LoggedFooter from './Logged';
import OwnedNoBatch from './OwnedNoBatch';

interface IProps {
  mine: boolean,
  batchId: string,
}

export default function Footer({ mine, batchId }: IProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <FooterNotLogged />;
  }

  return (
    <>
      {(mine && !batchId) && <OwnedNoBatch />}
      {(mine && batchId) && <OwnedNoBatch />}
      {(!mine && isAuthenticated) && <LoggedFooter />}
    </>
  );
}
