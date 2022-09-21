import PlanCard from '@components/pages/plans/PlanCard';
import { Section } from '@components/Section';
import { Direction } from '@components/Direction';
import { WrapperPlans } from '@styles/pages/plans';

const plans = [
  {
    title: 'Anúncios de até R$50.000,00',
    information: {
      title: 'R$69,90 mensais',
      detail: 'ou',
      subtitle: '8% do valor de venda',
    },
    description: 'Garanta visibilidade na Galeria Premium por mais R$ 69,90 por mês',
  },

  {
    title: 'Anúncios superiores a R$50.000,00 até R$300.000,00',
    information: {
      title: 'R$ 120,00 mensais',
      detail: 'ou',
      subtitle: '8% do valor de venda',
    },
    description: 'Garanta visibilidade na Galeria Premium por mais R$ 120,00 por mês',
  },

  {
    title: 'Anúncios superiores a R$300.000,00',
    information: {
      title: 'R$180,00 mensais',
      detail: 'e',
      subtitle: '8% do valor de venda',
    },
    description: 'Garanta visibilidade na Galeria Premium por mais R$ 180,00 por mês',
  },
];

export default function Plans() {
  return (
    <Direction style={{ margin: 'auto', width: 'fit-content' }}>
      <Section.Header>
        <Section.Title as="h1">Nossos Planos</Section.Title>
      </Section.Header>

      <WrapperPlans>
        {plans.map((plan) => (
          <PlanCard key={plan.title} {...plan} />
        ))}
      </WrapperPlans>
    </Direction>
  );
}
