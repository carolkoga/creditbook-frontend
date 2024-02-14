import { Link } from '@components/Button';
import { Direction } from '@components/Direction';
import { Section } from '@components/Section';
import Image from 'next/image';

export default function InternalServerError() {
  return (
    <Section.Container>
      <Direction alignItems="center" justifyContent="center">
        <Section.Title as="h1">
          Ops, aconteceu erro interno, aguarde até resolvermos!
        </Section.Title>

        <Image
          src="/assets/images/errors/500.svg"
          alt="Aconteceu algum erro no nosso servidor"
          width="581"
          height="583"
        />

        <Link legacyBehavior href="/contact">Falar com Suporte</Link>
      </Direction>
    </Section.Container>
  );
}
