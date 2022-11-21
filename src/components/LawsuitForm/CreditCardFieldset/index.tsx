import DebitAndCreditCard from '@components/pages/in/DebitAndCreditCard';
import { PaymentParams } from '@type/creditbook/payment';
import { Fieldset } from '../components/Fieldset';

interface CreditCardFieldsetProps {
  onOpenChooseCreditCardModal: () => void,
  creditCard: PaymentParams | undefined,
  isVisible: boolean
}

const initialValue: PaymentParams = {
  brand: 'ANY',
  cardNumberDisplay: 'Sem cartão',
  id: 'invalid_card',
  paymentMethodId: 'invalid_payment',
  token: 'invalid_token',
  userId: 'invalid_user',
};

export default function CreditCardFieldset({
  creditCard,
  isVisible,
  onOpenChooseCreditCardModal,
}: CreditCardFieldsetProps) {
  if (!isVisible) return null;

  return (
    <Fieldset>
      <legend>Cartão</legend>
      <DebitAndCreditCard
        card={creditCard ?? initialValue}
        buttonLabel={creditCard ? 'Trocar' : 'Adicionar'}
        buttonProps={{
          onClick: () => onOpenChooseCreditCardModal(),
          variant: 'secondary',
        }}
      />
    </Fieldset>
  );
}
