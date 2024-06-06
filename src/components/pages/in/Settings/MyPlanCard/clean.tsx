/* eslint-disable max-len */
import { AnnouncementPlanType } from '@type/creditbook/Lawsuits';
import { Button } from '@components/Button';
import {
  TagHeader, Header, Body, Information, ContainerClean,
} from './styled';

interface MyPlanCardProps {
  plan: Pick<AnnouncementPlanType, 'type' | 'plan' | 'premium'>
  isPremium: boolean;
  onPremiumToggleClick: () => void;
  premiumState: 'add' | 'remove' | null;
  // planMode: 'byMonth' | 'byPercent' | 'both' | 'batch',
}

export default function MyPlanCleanCard({
  plan, isPremium, onPremiumToggleClick, premiumState
}: MyPlanCardProps) {
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
          <Information.Title>Premium
          </Information.Title>
          <Information.Content>{plan.premium}</Information.Content>

          {(!premiumState) && (
          <Button onClick={onPremiumToggleClick} type="button">
            {isPremium ? 'Remover Premium' : 'Adicionar Premium'}
          </Button>
          )}

          {(premiumState) && (
          <Button variant="secondary" onClick={onPremiumToggleClick} type="button">
            Cancelar
          </Button>
          )}

        </Information.Container>
      </Body>
    </ContainerClean>
  );
}
