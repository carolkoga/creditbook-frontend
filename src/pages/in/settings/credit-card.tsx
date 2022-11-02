import { useCallback, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { creditCardSchemaValidation } from '@validations/yup/CreditCard';

import { Button } from '@components/Button';
import { Direction } from '@components/Direction';
import NewCreditCard from '@components/pages/in/NewCreditCard';
import { StructureSettings } from '@components/pages/in/Settings/StructureSettings';
import { Section } from '@components/Section';
import DebitAndCreditCard from '@components/pages/in/DebitAndCreditCard';
import { NewPaymentParams, PaymentParams } from '@type/creditbook/payment';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { paymentServices } from '@services/creditbook/payments';
import { ListCreditCard } from '@components/pages/in/ListCreditCard';
import AlertModal from '@components/AlertModal';
import { toast } from 'react-toastify';

export default function CreditCard() {
  const [isVisibleCreditCardModal, setIsVisibleCreditCardModal] = useState(false);
  const [creatingPaymentLoader, setCreatingPaymentLoader] = useState(false);
  const [creditCards, setCreditCards] = useState([] as PaymentParams[]);
  const [creditCardBeingDeleted, setCreditCardBeingDeleted] = useState({} as PaymentParams | null);
  const [deleteModalCreditCard, setDeleteModalCreditCard] = useState(false);
  const [deletingCreditCard, setDeletingCreditCard] = useState(false);
  const methodsToCreateCard = useForm<NewPaymentParams>({
    resolver: yupResolver(creditCardSchemaValidation),
    mode: 'onBlur',
  });

  const loadPayments = useCallback(async () => {
    try {
      await paymentServices.listPayments();
    } catch {
      toast.error('Erro ao carregar os cartões cadastrados');
    }
  }, []);

  function handleOpenVisibilityCreditCardModal() {
    setIsVisibleCreditCardModal(true);
  }

  function handleCloseVisibilityCreditCardModal() {
    setIsVisibleCreditCardModal(false);
    methodsToCreateCard.clearErrors();
    methodsToCreateCard.reset();
  }

  function handleCloseVisibilityModalToDeleteCreditCard() {
    setDeleteModalCreditCard(false);
    setCreditCardBeingDeleted(null);
  }

  function handleOpenVisibilityModalToDeleteCreditCard(card: PaymentParams) {
    setDeleteModalCreditCard(true);
    setCreditCardBeingDeleted(card);
  }

  async function handleRegisterCreditCard(data: NewPaymentParams) {
    try {
      setCreatingPaymentLoader(true);
      const { data: paymentRegistered } = await paymentServices.createPayment(data);
      setCreditCards((oldState) => ([...oldState, paymentRegistered]));
      handleCloseVisibilityCreditCardModal();
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      setCreatingPaymentLoader(false);
    }
  }

  async function handleDeleteCreditCard(id: string) {
    try {
      setDeletingCreditCard(true);
      await paymentServices.deletePayment(id);
      setCreditCards((oldState) => oldState.filter((currentCredit) => currentCredit.id !== id));
      setDeleteModalCreditCard(false);
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      setDeletingCreditCard(false);
    }
  }

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  return (
    <StructureSettings>
      <Section.Container>
        <Section.Header>
          <Direction direction="horizontal" alignItems="center">
            <Section.Title as="h1" textColor="dark">
              Cartões
            </Section.Title>
            <Button onClick={handleOpenVisibilityCreditCardModal} variant="secondary">
              Novo cartão
            </Button>
          </Direction>
        </Section.Header>

        <ListCreditCard>
          {creditCards && creditCards.map((card) => (
            <li key={card.id}>
              <DebitAndCreditCard
                buttonLabel="Excluir"
                buttonProps={{
                  variant: 'danger',
                  onClick: () => handleOpenVisibilityModalToDeleteCreditCard(card),
                }}
                card={card}
              />
            </li>
          ))}
        </ListCreditCard>
      </Section.Container>

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

      <AlertModal
        type="danger"
        isVisible={deleteModalCreditCard}
        title={`
          O cartão ${creditCardBeingDeleted?.cardNumber?.split(' ')?.at(1)}
           ******* ${creditCardBeingDeleted?.cardNumber?.split(' ')?.at(-1)}
           está preste a ser deletado, você tem certeza disso?
        `}
        confirm={{
          label: 'Sim, deletar',
          onConfirmButton: () => handleDeleteCreditCard(creditCardBeingDeleted?.id!),
        }}
        cancel={{
          label: 'Cancelar',
          onCancelButton: () => handleCloseVisibilityModalToDeleteCreditCard(),
        }}
        isLoading={deletingCreditCard}
      />
    </StructureSettings>
  );
}
