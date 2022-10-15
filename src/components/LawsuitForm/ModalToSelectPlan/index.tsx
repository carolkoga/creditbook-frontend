import { Overlay } from '@components/Overlay';
import { Section } from '@components/Section';
import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Actions,
  CheckoutContainer,
  CheckoutPriceSingle,
  CheckoutWrapper,
  Container, PlanContainer, PlanContent, PlanHeader, PlanList,
} from './styled';

export default function ModalToSelectPlan() {
  const { setValue } = useFormContext();
  const [byMonth, setByMonth] = useState<boolean>(false);
  const [byPercent, setByPercent] = useState<boolean>(false);
  const [isPremium, setIsPremium] = useState<boolean>(false);

  const handleVerifyIsBothPlan = useCallback(() => {
    if (byPercent && byMonth) {
      setValue('plan', 'both');
      return;
    }

    if (byPercent) {
      setValue('plan', 'byPercent');
      return;
    }

    if (byMonth) {
      setValue('plan', 'byMonth');
      return;
    }

    if (!byMonth && !byPercent) {
      setValue('plan', '');
    }
  }, [byPercent, byMonth]);

  function handleSelectPlanByMonth() {
    setByMonth((oldState) => !oldState);
  }

  function handleSelectPlanByPercent() {
    setByPercent((oldState) => !oldState);
  }

  function handleSelectPremium() {
    setIsPremium((oldState) => !oldState);
    setValue('isPremium', isPremium ? '1' : '0');
  }

  useEffect(() => {
    handleVerifyIsBothPlan();
  }, [handleVerifyIsBothPlan]);

  return (
    <Overlay>
      <Section.Container>
        <Container>
          <Section.Header className="header">
            <Section.Title>Escolha o Plano</Section.Title>
          </Section.Header>

          <PlanList>
            <PlanContainer>
              <PlanHeader>
                <h2>
                  Plano Mensal por apenas R$ 69.90
                </h2>
              </PlanHeader>

              <PlanContent>
                <button type="button" onClick={() => handleSelectPlanByMonth()}>
                  {!byMonth ? 'Escolher' : 'Escolhido'}
                </button>
              </PlanContent>
            </PlanContainer>

            <PlanContainer highlight>
              <PlanHeader highlight>
                <h2>
                  Aumente visiblidade por apenas R$ 69.90
                </h2>
              </PlanHeader>

              <PlanContent>
                <button type="button" onClick={handleSelectPremium}>
                  {!isPremium ? 'Adicionar Premium' : 'Adicionado'}
                </button>
              </PlanContent>
            </PlanContainer>

            <PlanContainer>
              <PlanHeader>
                <h2>
                  8% do valor de venda
                </h2>
              </PlanHeader>

              <PlanContent>
                <button type="button" onClick={() => handleSelectPlanByPercent()}>
                  {!byPercent ? 'Escolher' : 'Escolhido'}
                </button>
              </PlanContent>
            </PlanContainer>
          </PlanList>

          <CheckoutContainer>
            <CheckoutWrapper>
              <CheckoutPriceSingle>
                <span>Plano</span>
                <small>R$ 69.90</small>
              </CheckoutPriceSingle>

              <CheckoutPriceSingle>
                <span>Premium</span>
                <small>R$ 00.00</small>
              </CheckoutPriceSingle>

              <CheckoutPriceSingle subtotal>
                <span>Total</span>
                <small>R$ 69.90</small>
              </CheckoutPriceSingle>
            </CheckoutWrapper>
          </CheckoutContainer>

          <Actions>
            <button type="button">
              Voltar
            </button>

            <button type="submit">
              Cadastrar
            </button>
          </Actions>
        </Container>
      </Section.Container>
    </Overlay>
  );
}
