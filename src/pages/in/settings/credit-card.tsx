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
import NotFoundData from '@components/NotFoundData';
import { Alert } from 'antd';

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
      const response = await paymentServices.listPayments();
      setCreditCards(response.data);
    } catch (error) {
      handleCatchErrorRequest(error as never);
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
      const { data: createdToken } = await paymentServices.createToken(data);
      const { data: paymentRegistered } = await paymentServices.createPayment(createdToken);
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
            <Button onClick={handleOpenVisibilityCreditCardModal} variant="secondary" size="small">
              Novo cartão
            </Button>
          </Direction>
        </Section.Header>

        {!!creditCards?.length && (
          <ListCreditCard>
            {creditCards.map((card) => (
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
        )}

        {creditCards?.length <= 0 && (
          <NotFoundData title="Não há cartão cadastrado" type="children">
            <Button onClick={handleOpenVisibilityCreditCardModal} size="outline-filled-round">
              Novo cartão
            </Button>
            <Alert
              type="info"
              message={`
                Adicione um novo cartão nos anúncios em assinatura para que não ocorra a desativação
              `}
            />
          </NotFoundData>
        )}
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
        _css={{ maxWidth: '574px' }}
        type="danger"
        isVisible={deleteModalCreditCard}
        title={`
          O cartão com final **${creditCardBeingDeleted?.cardNumberDisplay?.replaceAll(/[A-Z]/g, '')?.replaceAll(/[-]/g, '')}
           está preste a ser deletado, você tem certeza disso?
        `}
        description={`
          Ao deletar cartão de crédito os anúncios de assinatura ficaram disponíveis até a expiração do contrato.
          Para que não haja a desativação dos anúncios em assinaturas adicione um novo cartão.
        `}
        confirm={{
          label: 'Entendi, deletar',
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
