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
import { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import useSWR from 'swr';
import { Actions } from '../ModalToSelectPlan/styled';

import { Container, ListContainerPayment, RadioButton } from './styled';

interface IProps {
  isVisible: boolean,
  loading?: boolean,
  onBack: () => void,
  label: string,
}

export default function ChooseCreditCard({
  isVisible, label, onBack, loading,
}: IProps) {
  const [isVisibleCreditCardModal, setIsVisibleCreditCardModal] = useState(false);
  const [creatingPaymentLoader, setCreatingPaymentLoader] = useState(false);
  const { data: payments, mutate, isValidating } = useSWR<PaymentParams[]>('credit_cards', async () => (await paymentServices.listPayments()).data);
  const methodsToCreateCard = useForm<NewPaymentParams>();
  const { register, watch } = useFormContext();
  const chosenCreditCard = watch('creditCard');

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
      const { data: newPayment } = await paymentServices.createPayment(data);
      mutate(newPayment);
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

            {(!payments || payments.length <= 0) && (
              <Button type="button" onClick={handleOpenVisibilityCreditCardModal}>Novo Cartão</Button>
            )}
          </Section.Header>

          <Section.Container>
            <ListContainerPayment>
              {(!isValidating && payments) && payments?.map((payment) => (
                <li key={payment.id}>
                  <RadioButton
                    htmlFor={payment.id}
                    chosen={payment.id === chosenCreditCard ? 'true' : 'false'}
                  >
                    <DebitAndCreditCard card={payment} />
                    <input
                      type="radio"
                      id={payment.id}
                      value={payment.id}
                      {...register('paymentMethodId')}
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

              <Button type="submit" isLoading={loading}>
                {label}
              </Button>
            </Direction>
          </Actions>

          <FormProvider {...methodsToCreateCard}>
            <NewCreditCard
              submitLabel={!creatingPaymentLoader ? 'Criar' : 'Criando'}
              isVisible={isVisibleCreditCardModal}
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
  loading: false,
};
