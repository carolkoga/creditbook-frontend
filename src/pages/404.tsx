import { useMemo } from 'react';
import { Link } from '@components/Button';
import { Direction } from '@components/Direction';
import { Section } from '@components/Section';
import useAuth from '@hooks/useAuth';
import Image from 'next/image';

export default function Custom404() {
  const { user } = useAuth();
  const routeToRedirect = useMemo(() => {
    if (user?.role === 'admin') {
      return '/admin/dashboard';
    } if (user?.role === 'user') {
      return '/in/home';
    }

    return '/';
  }, [user]);
  return (
    <Section.Container>
      <Direction alignItems="center" justifyContent="center" gap="32px">
        <Section.Title as="h1">
          Essa pagina não está disponível ainda
        </Section.Title>

        <Image
          src="/assets/images/errors/404.svg"
          alt="Essa pagina não foi encontrada"
          width="581px"
          height="583px"
        />

        <Link href={routeToRedirect} size="outline-filled-round">Volta para Home</Link>
      </Direction>
    </Section.Container>
  );
}
