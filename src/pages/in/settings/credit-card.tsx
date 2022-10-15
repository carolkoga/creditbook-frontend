import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';

import { creditCardSchemaValidation } from '@validations/yup/CreditCard';

import { Button } from '@components/Button';
import { Direction } from '@components/Direction';
import NewCreditCard from '@components/pages/in/NewCreditCard';
import { StructureSettings } from '@components/pages/in/Settings/StructureSettings';
import { Section } from '@components/Section';
import DebitAndCreditCard from '@components/pages/in/DebitAndCreditCard';

export default function CreditCard() {
  const [isVisibleCreditCardModal, setIsVisibleCreditCardModal] = useState(false);
  const methodsToCreateCard = useForm({
    resolver: yupResolver(creditCardSchemaValidation),
    mode: 'onBlur',
  });

  function handleOpenVisibilityCreditCardModal() {
    setIsVisibleCreditCardModal(true);
  }

  function handleCloseVisibilityCreditCardModal() {
    setIsVisibleCreditCardModal(false);
    methodsToCreateCard.clearErrors();
    methodsToCreateCard.reset();
  }

  function handleRegisterCreditCard(data: any) {
    console.log(data);
  }

  return (
    <StructureSettings>
      <Section.Container>
        <Section.Header>
          <Direction direction="horizontal" alignItems="center">
            <Section.Title as="h1">
              Cartões
            </Section.Title>
            <Button onClick={handleOpenVisibilityCreditCardModal} variant="secondary">
              Novo cartão
            </Button>
          </Direction>
        </Section.Header>

        <DebitAndCreditCard />
      </Section.Container>

      <FormProvider {...methodsToCreateCard}>
        <NewCreditCard
          submitLabel="Criar"
          isVisible={isVisibleCreditCardModal}
          title="Adicionar Cartão"
          onSubmit={methodsToCreateCard.handleSubmit(handleRegisterCreditCard)}
          onCancel={handleCloseVisibilityCreditCardModal}
        />
      </FormProvider>
    </StructureSettings>
  );
}
