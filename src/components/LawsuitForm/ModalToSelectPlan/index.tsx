import { Button } from '@components/Button';
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

interface IProps {
  isVisible: boolean,
  loading?: boolean,
  onBack: () => void,
  label: string,
}

export default function ModalToSelectPlan({
  isVisible, loading, label, onBack,
}: IProps) {
  const { setValue, watch } = useFormContext();
  const income: string = watch('income');
  const [defaultPlan, defaultIsPremium] = watch(['plan', 'isPremium']);
  const price = useMemo(() => {
    const incomeParsed = Number(income?.replaceAll(/\D/g, ''));

    if (incomeParsed > 50000 && incomeParsed < 300000) return 120;
    if (incomeParsed > 300000) {
      setValue('plan', 'both');
      return 180;
    }
    setValue('plan', 'byMonth');
    return 69.90;
  }, [income]);
  const [byMonth, setByMonth] = useState<boolean>(defaultPlan === 'byMonth' || defaultPlan === 'both' || price === 69.90 || price === 180);
  const [byPercent, setByPercent] = useState<boolean>(defaultPlan === 'byPercent' || defaultPlan === 'both' || price === 180);
  const [isPremium, setIsPremium] = useState<boolean>(defaultIsPremium || false);
  const subtotal = useMemo(() => {
    let subtotalPremium = 0;

    if (isPremium) {
      subtotalPremium = price * 2;
    }

    if (price === 180) return `${convertToCurrency(subtotalPremium + price)} + 8%`;

    if (isPremium && byPercent) return `${convertToCurrency(subtotalPremium + price)} + 8%`;

    if (isPremium) return convertToCurrency(subtotalPremium + price);

    if (byPercent) return '8%';

    return convertToCurrency(price);
  }, [price, isPremium, byPercent]);
  const canChangePlan = price === 180;
  if (!isVisible) return null;

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

                {(price !== 180 && !byPercent) && (
                  <small>{convertToCurrency(price)}</small>
                )}

                {(price !== 180 && byPercent) && (
                  <small>8%</small>
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
            <button type="button" onClick={() => onBack()}>
              Voltar
            </button>

            <Button type="submit" isLoading={loading}>
              {label}
            </Button>
          </Actions>
        </Container>
      </Section.Container>
    </Overlay>
  );
}

ModalToSelectPlan.defaultProps = {
  loading: false,
};
