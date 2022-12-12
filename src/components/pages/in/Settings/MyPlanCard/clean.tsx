import { AnnouncementPlanType } from '@type/creditbook/Lawsuits';
import {
  TagHeader, Header, Body, Information, ContainerClean,
} from './styled';

interface MyPlanCardProps {
  plan: Pick<AnnouncementPlanType, 'type' | 'plan' | 'premium'>
}

export default function MyPlanCleanCard({ plan }: MyPlanCardProps) {
  return (
    <ContainerClean>
      <Header>
        <TagHeader type={plan.type}>
          {plan.type === 'batch' && 'Em Lote'}
          {plan.type === 'announcement' && 'Anúncio'}
        </TagHeader>
      </Header>

      <Body>
        <Information.Container>
          <Information.Title>Plano</Information.Title>
          <Information.Content>{plan.plan}</Information.Content>
        </Information.Container>

        <Information.Container>
          <Information.Title>Premium</Information.Title>
          <Information.Content>{plan.premium}</Information.Content>
        </Information.Container>
      </Body>
    </ContainerClean>
  );
}
