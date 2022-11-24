import { Overlay } from '@components/Overlay';
import { Section } from '@components/Section';
import convertToCurrency from '@utils/convertToCurrency';
import { CheckCircle } from 'phosphor-react';
import { ReactNode, useEffect, useMemo } from 'react';
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
  children?: ReactNode
}

export default function ModalToSelectPlan({ isVisible, children }: IProps) {
  const {
    watch, register, setValue, resetField,
  } = useFormContext();
  const income: number = Number(watch('income')?.replaceAll(/\D/g, ''));
  const isPlanByPercent = watch('plan') === 'byPercent';
  const planSelected = watch('plan');
  const isPremium = watch('isPremium');

  const price = useMemo(() => {
    if (income > 50000 && income < 300000) return 120;

    if (income > 300000) {
      return 180;
    }

    return 69.90;
  }, [income]);

  const subTotal = useMemo(() => {
    const isPremiumValue = convertToCurrency(price);

    if (planSelected === 'byPercent') {
      return '8%';
    }

    if (planSelected === 'byPercent' && isPremium) {
      return `8% + Premium (${isPremiumValue})`;
    }

    if (isPremium) {
      const totalValue = price * 2;
      return convertToCurrency(totalValue);
    }

    return convertToCurrency(price);
  }, [planSelected, isPremium]);

  useEffect(() => {
    resetField('plan');
    if (income > 300000) {
      setValue('plan', 'both');
    }
  }, [income]);

  if (!isVisible) return null;

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
                  {convertToCurrency(price)} / ao mês
                </h2>
              </PlanHeader>

              <p>
                Período mínimo da assinatura:
                <br />
                6 meses {convertToCurrency(price * 6)}
              </p>

              <PlanContent>
                <ButtonSelect selected={planSelected.includes('byMonth') || planSelected.includes('both')}>
                  {planSelected.includes('byMonth') || planSelected.includes('both')
                    ? 'Escolhido'
                    : 'Escolher'}
                  <input type="radio" value="byMonth" {...register('plan')} />
                </ButtonSelect>
              </PlanContent>
            </PlanContainer>

            <h3>OU</h3>

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
                <ButtonSelect selected={planSelected === 'byPercent' || planSelected === 'both'}>
                  {planSelected === 'byPercent' || planSelected === 'both'
                    ? 'Escolhido'
                    : 'Escolher'}
                  <input type="radio" value="byPercent" {...register('plan')} />
                </ButtonSelect>
              </PlanContent>
            </PlanContainer>
          </PlanList>

          <div className="wrapper__premium">
            <Section.Title>Adicionar na Galeria Premium</Section.Title>

            <PlanContainer>
              <PlanHeader>
                <h2>
                  Aumente visiblidade por apenas
                  {' '}
                  {convertToCurrency(price)}
                </h2>
              </PlanHeader>

              <p>
                Período mínimo da assinatura:
                6 meses {convertToCurrency(price * 6)}

              </p>

              <div className="container-advantage">
                <div className="advantage">
                  <CheckCircle size={32} color="#25885d" weight="fill" />
                  <span>Maior Destaque</span>
                </div>

                <div className="advantage">
                  <CheckCircle size={32} color="#25885d" weight="fill" />
                  <span>Maior Possibilidade de Venda</span>
                </div>
              </div>

              <PlanContent>
                <ButtonSelect selected={isPremium} type="checkbox">
                  {!isPremium ? 'Adicionar Premium' : 'Remover Premium'}
                  <input type="checkbox" {...register('isPremium')} />
                </ButtonSelect>
              </PlanContent>
            </PlanContainer>
          </div>

          <CheckoutContainer>
            <CheckoutWrapper>
              <CheckoutPriceSingle>
                <span>Plano</span>
                {price === 180 && (
                  <small>{convertToCurrency(price)} + 8%</small>
                )}

                {(price !== 180 && !isPlanByPercent) && (
                  <small>{convertToCurrency(price)}</small>
                )}

                {(price !== 180 && isPlanByPercent) && (
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
                <small>{subTotal}</small>
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
