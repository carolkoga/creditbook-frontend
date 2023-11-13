import { Button } from '@components/Button';
import { Overlay } from '@components/Overlay';
import DebitAndCreditCard from '@components/pages/in/DebitAndCreditCard';
import NewCreditCard from '@components/pages/in/NewCreditCard';
import ReactPortal from '@components/ReactPortal';
import { Section } from '@components/Section';
import { paymentServices } from '@services/creditbook/payments';
import { Direction } from '@styles/pages/home';
import { NewPaymentParams, PaymentParams } from '@type/creditbook/payment';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { ReactNode, useRef, useState } from 'react';
import {
  Controller, FormProvider, useForm, useFormContext,
} from 'react-hook-form';
import useSWR from 'swr';
import { Actions } from '../ModalToSelectPlan/styled';

import { Container, ListContainerPayment, RadioButton } from './styled';

interface IProps {
  isVisible: boolean,
  children?: ReactNode,
  onBack: () => void,
}

export default function ChooseCreditCard({
  isVisible, onBack, children,
}: IProps) {
  const [isVisibleCreditCardModal, setIsVisibleCreditCardModal] = useState(false);
  const [creatingPaymentLoader, setCreatingPaymentLoader] = useState(false);
  const { data: payments, mutate } = useSWR<PaymentParams[]>('credit_cards', async () => (await paymentServices.listPayments()).data);
  const methodsToCreateCard = useForm<NewPaymentParams>();
  const { control, watch, setValue } = useFormContext();
  const chosenCreditCard = watch('paymentMethodId');
  const inputRadioRef = useRef<any>();

  function handleOpenVisibilityCreditCardModal() {
    setIsVisibleCreditCardModal(true);
  }

  function handleCloseVisibilityCreditCardModal() {
    setIsVisibleCreditCardModal(false);
    methodsToCreateCard.clearErrors();
    methodsToCreateCard.reset();
  }

  async function handleRegisterCreditCard(data: NewPaymentParams) {
    try {
      setCreatingPaymentLoader(true);
      // @ts-ignore
      const { data: newPayment } = await paymentServices.createPaymentMethod(data);
      mutate(newPayment);
      setValue('paymentMethodId', newPayment.id);
      handleCloseVisibilityCreditCardModal();
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      setCreatingPaymentLoader(false);
    }
  }

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
                    chosen={(payment.id === chosenCreditCard) ? 'false' : 'true'}
                  >
                    <DebitAndCreditCard card={payment} />
                    <Controller
                      name="paymentMethodId"
                      control={control}
                      render={({ field }) => (
                        <input
                          ref={inputRadioRef}
                          type="radio"
                          defaultChecked={!!payment.id === chosenCreditCard}
                          id={payment.id}
                          value={payment.id}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
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
              submitLabel={!creatingPaymentLoader ? 'Criar' : 'Criando'}
              onClose={() => setIsVisibleCreditCardModal(false)}
              isVisible={isVisibleCreditCardModal}
              // @ts-ignore
              title="Adicionar Cartão"
              onSubmit={methodsToCreateCard.handleSubmit(handleRegisterCreditCard)}
              onCancel={handleCloseVisibilityCreditCardModal}
              loading={creatingPaymentLoader}
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
