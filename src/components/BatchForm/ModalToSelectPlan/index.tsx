import { Overlay } from '@components/Overlay';
import { Section } from '@components/Section';
import convertToCurrency from '@utils/convertToCurrency';

import { ReactNode, useMemo } from 'react';
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
  setPlan: Function,
  batchValue: number
  children: ReactNode,
  planSelected: string
}

// const plansValues = {
//   180: 300000,
//   120: 50000,
//   69.90: 50000,
// };

export default function ModalToSelectPlan({
  isVisible, batchValue, children, planSelected, setPlan,
}: IProps) {
  if (!isVisible) return null;
  console.log(planSelected);

  const price = useMemo(() => {
    if (batchValue > 50000 && batchValue < 300000) return 120;

    if (batchValue > 300000) {
      setPlan('both');
      return 180;
    }

    return 69.90;
  }, [batchValue]);

  const subTotal = useMemo(() => {
    if (planSelected === 'byPercent') {
      return '8%';
    }

    return convertToCurrency(price);
  }, [planSelected]);

  return (
    <Overlay>
      <Container>
        <Section.Header className="header">
          <Section.Title>
            {/* {price === 69.90 && 'Lote de até R$50.000,00'} */}
            {/* {price === 120 && 'Lote superior a R$50.000,00 até R$300.000,00'} */}
            {price === 180 && 'Lote superior a R$300.000,00'}
          </Section.Title>
        </Section.Header>

        <PlanList>
          <PlanContainer>
            <PlanHeader>
              <h2>
                {convertToCurrency(price)} / ao mês
              </h2>
            </PlanHeader>

            <p>
              Período mínimo de assinatura: 6 meses <br />
              Total: {convertToCurrency(price * 6)}
            </p>

            <PlanContent>
              <ButtonSelect
                selected={planSelected === 'byMonth' || planSelected === 'both'}
                onClick={() => setPlan('byMonth')}
              >
                {planSelected === 'byMonth' || planSelected === 'both'
                  ? 'Escolhido'
                  : 'Escolher'}
              </ButtonSelect>
            </PlanContent>
          </PlanContainer>

          <h3>
            {planSelected === 'both' ? 'E' : 'OU'}
          </h3>

          <PlanContainer>
            <PlanHeader>
              <h2>
                8%
                {' '}
                <span>do valor de venda</span>
              </h2>
            </PlanHeader>

            <p>
              Pagos após a venda do crédito anunciado
            </p>

            <PlanContent>
              <ButtonSelect
                selected={planSelected === 'byPercent' || planSelected === 'both'}
                onClick={() => setPlan('byPercent')}
              >
                {planSelected === 'byPercent' || planSelected === 'both'
                  ? 'Escolhido'
                  : 'Escolher'}
              </ButtonSelect>
            </PlanContent>
          </PlanContainer>
        </PlanList>

        <CheckoutContainer>
          <CheckoutWrapper>
            <CheckoutPriceSingle>
              <span>Plano</span>
              {batchValue === 180 && (
                <small>{convertToCurrency(batchValue)} + 8%</small>
              )}

              {(batchValue !== 180 /* && !isPlanByPercent */) && (
                <small>{convertToCurrency(batchValue)}</small>
              )}

              {(batchValue !== 180 /* && isPlanByPercent */) && (
                <small>8%</small>
              )}
            </CheckoutPriceSingle>

            <CheckoutPriceSingle>

              <small>{convertToCurrency(0)}</small>
            </CheckoutPriceSingle>

            <CheckoutPriceSingle subtotal>
              <span>Total</span>
              <small>{subTotal}</small>
            </CheckoutPriceSingle>
          </CheckoutWrapper>
        </CheckoutContainer>

        <Actions>
          {children}
        </Actions>
      </Container>
    </Overlay>
  );
}

ModalToSelectPlan.defaultProps = {
  defaultValues: null,
  children: null,
};
