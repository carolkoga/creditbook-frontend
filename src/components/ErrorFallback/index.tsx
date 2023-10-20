import { useMemo } from 'react';
import { Direction } from '@components/Direction';
import { Section } from '@components/Section';
import useAuth from '@hooks/useAuth';
import Image from 'next/image';
import { Link } from '@components/Button';

export default function ErrorFallback() {
  const { user } = useAuth();

  const routeToRedirect = useMemo(() => {
    if (user?.role === 'admin') {
      return '/admin/dashboard';
    }

    if (user?.role === 'user') {
      return '/in/home';
    }

    return '/';
  }, [user]);

  return (
    <Section.Container>
      <Direction alignItems="center" justifyContent="center" gap="32px">
        <Section.Title as="h1">
          Desculpa pela inconveniência, alguma coisa quebrou
        </Section.Title>

        <Section.Subtitle>
          Clica na botão abaixo para navegar para pagina principal
        </Section.Subtitle>

        <Image
          src="/assets/images/errors/404.svg"
          alt="Essa pagina não foi encontrada"
          width="581px"
          height="583px"
        />

        <Link
          href={routeToRedirect}
          size="outline-filled-round"
          replace
        >
          Volta para Home
        </Link>
      </Direction>
    </Section.Container>
  );
}
