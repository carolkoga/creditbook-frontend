import { Overlay } from '@components/Overlay';
import { Section } from '@components/Section';
import convertToCurrency from '@utils/convertToCurrency';
import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Actions,
  ButtonSelect,
  CheckoutContainer,
  CheckoutPriceSingle,
  CheckoutWrapper,
  Container, PlanContainer, PlanContent, PlanHeader, PlanList,
} from './styled';

export default function ModalToSelectPlan() {
  const { setValue, watch } = useFormContext();
  const income = watch('income');
  const price = useMemo(() => {
    const incomeParsed = Number(income?.replace('R$ ', ''));

    if (incomeParsed > 50000 && incomeParsed < 300000) return 120;
    if (incomeParsed > 300000) return 180;

    return 69.90;
  }, [income]);
  const [byMonth, setByMonth] = useState<boolean>(price === 180);
  const [byPercent, setByPercent] = useState<boolean>(price === 180);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const subtotal = useMemo(() => {
    let subtotalPremium = 0;

    if (isPremium) {
      subtotalPremium = price * 2;
    }

    if (isPremium && byPercent) return `${convertToCurrency(subtotalPremium + price)} + 8%`;

    if (isPremium) return convertToCurrency(subtotalPremium + price);

    if (byPercent) return '8%';

    return convertToCurrency(price);
  }, [price, isPremium, byPercent]);
  const canChangePlan = price === 180;

  function handleSelectPlan(plan: 'byMonth' | 'byPercent') {
    if (plan === 'byMonth') {
      setByMonth(true);
      setByPercent(false);
      setValue('plan', 'byMonth');
    }

    if (plan === 'byPercent') {
      setByMonth(false);
      setByPercent(true);
      setValue('plan', 'byPercent');
    }
  }

  function handleSelectPremium() {
    setIsPremium((oldState) => !oldState);
    setValue('isPremium', isPremium ? '1' : '0');
  }

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
                  Plano Mensal por apenas
                  {' '}
                  {convertToCurrency(price)}
                </h2>
              </PlanHeader>

              <PlanContent>
                <ButtonSelect
                  type="button"
                  onClick={() => handleSelectPlan('byMonth')}
                  disabled={canChangePlan}
                  selected={byMonth}
                >
                  {!byMonth || canChangePlan ? 'Escolher' : 'Escolhido'}
                </ButtonSelect>
              </PlanContent>
            </PlanContainer>

            <PlanContainer highlight>
              <PlanHeader highlight>
                <h2>
                  Aumente visiblidade por apenas
                  {' '}
                  {convertToCurrency(price)}
                </h2>
              </PlanHeader>

              <PlanContent>
                <ButtonSelect type="button" onClick={handleSelectPremium} selected={isPremium}>
                  {!isPremium ? 'Adicionar Premium' : 'Adicionado'}
                </ButtonSelect>
              </PlanContent>
            </PlanContainer>

            <PlanContainer>
              <PlanHeader>
                <h2>
                  8% do valor de venda
                </h2>
              </PlanHeader>

              <PlanContent>
                <ButtonSelect
                  type="button"
                  onClick={() => handleSelectPlan('byPercent')}
                  disabled={canChangePlan}
                  selected={byPercent}
                >
                  {!byPercent || canChangePlan ? 'Escolher' : 'Escolhido'}
                </ButtonSelect>
              </PlanContent>
            </PlanContainer>
          </PlanList>

          <CheckoutContainer>
            <CheckoutWrapper>
              <CheckoutPriceSingle>
                <span>Plano</span>
                {price === 180 && (
                  <small>{convertToCurrency(price)} + 8%</small>
                )}

                {price !== 180 && (
                  <small>{convertToCurrency(price)}</small>
                )}
              </CheckoutPriceSingle>

              <CheckoutPriceSingle>
                <span>Premium</span>
                {isPremium && (
                  <small>{convertToCurrency(price)}</small>
                )}

                {!isPremium && (
                  <small>{convertToCurrency(0)}</small>
                )}
              </CheckoutPriceSingle>

              <CheckoutPriceSingle subtotal>
                <span>Total</span>
                <small>{subtotal}</small>
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
