import PlanCard from '@components/pages/plans/PlanCard';
import { HeaderSection, TitleSection } from '@styles/pages/home';
import { WrapperPlans } from '@styles/pages/plans';

const plans = [
  {
    title: 'Anúncios de até R$ 50.000,00',
    information: {
      title: 'R$ 69,90 mensais',
      subtitle: '8% do valor de venda',
    },
    description: 'Garanta visibilidade na Galeria Premium por mais R$ 69,90 por mês',
  },

  {
    title: 'Anúncios de até R$ 300.000,00',
    information: {
      title: 'R$ 120,00 mensais',
      subtitle: '8% do valor de venda',
    },
    description: 'Garanta visibilidade na Galeria Premium por mais R$ 120,00 por mês.',
  },

  {
    title: 'Anúncios superior à R$ 300.000,00',
    information: {
      title: 'R$ 180,00 mensais',
      subtitle: '8% do valor de venda',
    },
    description: 'Garanta visibilidade na Galeria Premium por mais R$ 180,00 por mês.',
  },
];

export default function Plans() {
  return (
    <>
      <HeaderSection>
        <TitleSection as="h1">Nossos Planos</TitleSection>
      </HeaderSection>

      <WrapperPlans>
        {plans.map((plan) => (
          <PlanCard key={plan.title} {...plan} />
        ))}
      </WrapperPlans>
    </>
  );
}
