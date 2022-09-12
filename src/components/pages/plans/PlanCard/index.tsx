import { Button } from '@components/Button/styled';
import Link from 'next/link';
import { Container, WrapperContent } from './styled';

interface PlanCardProps {
  title: string,
  information: {
    title: string,
    detail: string,
    subtitle: string,
  }
  description: string,
}

export default function PlanCard({ title, information, description }: PlanCardProps) {
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

          <Link href="/support/terms-of-service">
            <a>
              Ver regras e termos
            </a>
          </Link>
        </header>

        <footer>
          <small>
            {description}
          </small>

          <Button type="button" size="small" variant="secondary">
            Quero esse plano
          </Button>
        </footer>
      </WrapperContent>
    </Container>
  );
}
