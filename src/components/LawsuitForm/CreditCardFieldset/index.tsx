import DebitAndCreditCard from '@components/pages/in/DebitAndCreditCard';
import { PaymentParams } from '@type/creditbook/payment';
import { Fieldset } from '../components/Fieldset';

interface CreditCardFieldsetProps {
  onOpenChooseCreditCardModal: () => void,
  creditCard: PaymentParams | undefined,
  isVisible: boolean
}

export default function CreditCardFieldset({
  creditCard,
  isVisible,
  onOpenChooseCreditCardModal,
}: CreditCardFieldsetProps) {
  if (!isVisible || !creditCard) return null;

  return (
    <Fieldset>
      <legend>Cartão</legend>
      <DebitAndCreditCard
        card={creditCard}
        buttonLabel="Trocar"
        buttonProps={{
          onClick: () => onOpenChooseCreditCardModal(),
          variant: 'secondary',
        }}
      />
    </Fieldset>
  );
}
