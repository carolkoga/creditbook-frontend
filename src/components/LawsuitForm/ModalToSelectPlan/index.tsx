import { Overlay } from '@components/Overlay';
import { Section } from '@components/Section';
import convertToCurrency from '@utils/convertToCurrency';
import { ReactNode, useMemo, useState } from 'react';
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
  children?: ReactNode,
  defaultValues?: {
    income: number,
    plan: string,
    premium: boolean | null,
  }
}

export default function ModalToSelectPlan({
  isVisible, defaultValues, children,
}: IProps) {
  const { setValue, watch } = useFormContext();
  const income: string = watch('income');

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

  const defaultPlanMonth = useMemo(() => {
    if (defaultValues?.income !== Number(income?.replaceAll(/\D/g, ''))) {
      return price === 69.90 || price === 180;
    }

    if (defaultValues?.plan === 'both') {
      return true;
    }

    if (defaultValues?.plan === 'byMonth') {
      return true;
    }

    return false;
  }, [defaultValues, price]);

  const defaultPlanPercent = useMemo(() => {
    if (defaultValues?.income !== Number(income?.replaceAll(/\D/g, ''))) {
      return price === 180;
    }

    if (defaultValues?.plan === 'both') {
      return true;
    }

    if (defaultValues?.plan === 'byPercent') {
      return true;
    }

    return false;
  }, [defaultValues, price]);

  const [byMonth, setByMonth] = useState<boolean>(defaultPlanMonth);
  const [byPercent, setByPercent] = useState<boolean>(defaultPlanPercent);
  const [isPremium, setIsPremium] = useState<boolean>(defaultValues?.premium ?? false);
  const subtotal = useMemo(() => {
    let subtotalPremium = 0;
    if (isPremium) {
      subtotalPremium = price;
    }

    if (price === 180) return `${convertToCurrency(subtotalPremium + price)} + 8%`;

    if (isPremium && byPercent) return `${convertToCurrency(subtotalPremium)} + 8%`;

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
    setValue('isPremium', isPremium ? '0' : '1');
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

              <p>
                Período mínimo da assinatura:
                <br />
                6 meses {convertToCurrency(price * 6)}
              </p>

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

              <p>
                Período mínimo da assinatura:
                <br />
                6 meses {convertToCurrency(price * 6)}
              </p>

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

              <p>
                Pagos somente após a cessão do crédito
              </p>

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
            {children}
          </Actions>
        </Container>
      </Section.Container>
    </Overlay>
  );
}

ModalToSelectPlan.defaultProps = {
  defaultValues: null,
  children: null,
};
