import type { AllAccess } from '@components/LawsuitCard/types/Props';
import type { ILawSuits } from '@type/index';
import FooterAdmin from './Admin/Footer';
import FooterLogged from './Logged/Footer';
import FooterNotLogged from './NotLogged/Footer';

interface IProps {
  lawsuit: ILawSuits,
  access: keyof AllAccess,
}

export default function Footer({ lawsuit, access }: IProps) {
  return (
    <>
      {access === 'not logged' && <FooterNotLogged />}

      {access === 'logged' && <FooterLogged />}

      {access === 'admin' && <FooterAdmin lawsuit={lawsuit} />}
    </>
  );
}
