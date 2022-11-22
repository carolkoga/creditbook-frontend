import { Link } from '@components/Button';
import { AnnouncementPlanType } from '@type/creditbook/Lawsuits';
import {
  Container, Footer, TagHeader, Header, Body, Information,
} from './styled';

interface MyPlanCardProps {
  plan: AnnouncementPlanType
}

export default function MyPlanCard({ plan }: MyPlanCardProps) {
  return (
    <Container>
      <Header>
        <TagHeader type={plan.type}>
          {plan.type === 'batch' && 'Em Lote'}
          {plan.type === 'announcement' && 'Anúncio'}
        </TagHeader>
      </Header>

      <Body>
        <Information.Container>
          <Information.Title>Número do processo</Information.Title>
          <Information.Content>{plan.processNumber}</Information.Content>
        </Information.Container>

        <Information.Container>
          <Information.Title>Plano</Information.Title>
          <Information.Content>{plan.plan}</Information.Content>
        </Information.Container>

        <Information.Container>
          <Information.Title>Premium</Information.Title>
          <Information.Content>{plan.premium}</Information.Content>
        </Information.Container>
      </Body>

      <Footer>
        <Link size="x-large" variant="secondary" href={`/in/ads/${plan.id}`}>
          Sobre Anúncio
        </Link>

        {plan.plan !== '8%' && (
          <Link href={`/in/ads/edit/${plan.id}`}>
            Trocar cartão
          </Link>
        )}

      </Footer>
    </Container>
  );
}
