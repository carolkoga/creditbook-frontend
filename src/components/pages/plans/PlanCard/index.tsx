import Link from 'next/link';
import { ReactNode } from 'react';
import { Container, WrapperContent } from './styled';

interface PlanCardProps {
  title: string,
  information: {
    title: string,
    detail: string,
    subtitle: string,
  }
  description: string,
  children?: ReactNode,
}

export default function PlanCard({
  title, information, description, children,
}: PlanCardProps) {
  return (
    <Container>
      <header>
        <h2>{title}</h2>
      </header>

      <WrapperContent>
        <header className="body__header">
          <div>
            <h3>{information.title}</h3>
            <span>{information.detail}</span>
            <h4>{information.subtitle}</h4>
          </div>

          <Link legacyBehavior href="/support/terms-of-service">
            <a>
              Ver regras e termos
            </a>
          </Link>
        </header>

        <footer>
          <small>
            {description}
          </small>

          {children}
        </footer>
      </WrapperContent>
    </Container>
  );
}

PlanCard.defaultProps = {
  children: null,
};
