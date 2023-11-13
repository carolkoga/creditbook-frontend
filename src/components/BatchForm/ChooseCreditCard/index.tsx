import { Button } from '@components/Button';
import { Overlay } from '@components/Overlay';
import DebitAndCreditCard from '@components/pages/in/DebitAndCreditCard';
import NewCreditCard from '@components/pages/in/NewCreditCard';
import ReactPortal from '@components/ReactPortal';
import { Section } from '@components/Section';
import { paymentServices } from '@services/creditbook/payments';
import { Direction } from '@styles/pages/home';
import { NewPaymentParams, PaymentParams } from '@type/creditbook/payment';
import { ReactNode, useRef, useState } from 'react';
import {
  Controller, FormProvider, useForm,
} from 'react-hook-form';
import useSWR from 'swr';
import { Actions } from '../ModalToSelectPlan/styled';

import { Container, ListContainerPayment, RadioButton } from './styled';

interface IProps {
  isVisible: boolean,
  children?: ReactNode,
  onBack: () => void,
  choosenCreditCard?: string,
  setPaymentMethod: Function
}

export default function ChooseCreditCard({
  isVisible, onBack, children, choosenCreditCard, setPaymentMethod,
}: IProps) {
  const [isVisibleCreditCardModal, setIsVisibleCreditCardModal] = useState(false);
  const { data: payments } = useSWR<PaymentParams[]>('credit_cards', async () => (await paymentServices.listPayments()).data);
  const methodsToCreateCard = useForm<NewPaymentParams>();
  const inputRadioRef = useRef<any>();

  function handleOpenVisibilityCreditCardModal() {
    setIsVisibleCreditCardModal(true);
  }

  // function handleCloseVisibilityCreditCardModal() {
  //   setIsVisibleCreditCardModal(false);
  //   methodsToCreateCard.clearErrors();
  //   methodsToCreateCard.reset();
  // }

  if (!isVisible) return null;

  return (
    <ReactPortal>
      <Overlay style={{ zIndex: '1000' }}>
        <Container>
          <Section.Header>
            <Section.Title>Pagamento</Section.Title>
            <Button type="button" onClick={handleOpenVisibilityCreditCardModal}>
              Novo Cartão
            </Button>
          </Section.Header>

          <Section.Container>
            <ListContainerPayment>
              {!!payments?.length && payments?.map((payment) => (
                <li key={payment.id}>
                  <RadioButton
                    htmlFor={payment.id}
                    chosen={(payment.id === choosenCreditCard) ? 'false' : 'true'}
                  >
                    <DebitAndCreditCard card={payment} />
                    <Controller
                      name="paymentMethodId"
                      control={methodsToCreateCard.control}
                      render={({ field }) => (
                        <input
                          ref={inputRadioRef}
                          type="radio"
                          defaultChecked={payment.id === choosenCreditCard}
                          id={payment.id}
                          value={payment.id}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          // @ts-ignore
                          onSelect={(value) => setPaymentMethod(value.target.value)}
                        />
                      )}
                    />
                  </RadioButton>
                </li>
              ))}

              {(payments && payments?.length <= 0) && (
                <Section.Title
                  as="p"
                  textColor="dark"
                  style={{
                    textAlign: 'left',
                    fontSize: '18px',
                  }}
                >
                  Cadastre um cartão para continuar
                </Section.Title>
              )}
            </ListContainerPayment>
          </Section.Container>

          <Actions>
            <Direction>
              <button type="button" onClick={() => onBack()}>
                Voltar
              </button>

              {children}
            </Direction>
          </Actions>

          <FormProvider {...methodsToCreateCard}>
            <NewCreditCard
              onClose={() => setIsVisibleCreditCardModal(false)}
              isVisible={isVisibleCreditCardModal}
            />
          </FormProvider>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

ChooseCreditCard.defaultProps = {
  children: null,
};
