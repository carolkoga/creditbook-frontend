import styled, { css } from 'styled-components';

interface PlanProps {
  highlight?: boolean,
}

interface CheckoutPriceSingleProps {
  subtotal?: boolean,
}

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.grey[10]};
  padding: 53px 34px;
  border-radius: 10px;
  position: relative;

  @media (max-width: 540px) {
    margin-top: 262px;

    .header {
      align-items: center;
    }
  }

  @media (max-width: 440px) {
    padding: 53px 24px;
  }
`;

export const PlanList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const PlanContainer = styled.div<PlanProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  max-width: 213px;
  background: ${({ theme }) => theme.colors.grey[10]};
  min-height: 195px;

  p {
    text-align: center;
    margin: auto 8px;
  }

  ${({ highlight }) => (highlight && css`
    max-width: 235px;
    width: 100%;
    height: 249px;
  `)};
`;

export const PlanHeader = styled.div<PlanProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 18px;
  background: ${({ theme }) => theme.colors.primary.main};
  opacity: 0.9;
  margin-bottom: 12px;
  h2 {
    text-align: center;
    font-size: 18px;
    line-height: 29px;
    color: ${({ theme }) => theme.colors.grey[10]};
    width: 100%;
  }

  ${({ highlight }) => (highlight && css`
    background: ${({ theme }) => theme.colors.primary.main};
    filter: brightness(100%);
    opacity: 1;

  `)};
`;

export const PlanContent = styled.div`
  width: 100%;
  padding: 38px 16px 10px 16px;
`;

export const CheckoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
`;

export const CheckoutWrapper = styled.div`
  border: 1px solid #28DDE9;
  border-radius: 5px;
  padding: 8px;
  width: 198px;
`;

export const CheckoutPriceSingle = styled.div<CheckoutPriceSingleProps>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 12px;
  }

  span {
    color: #434242;
    font-size: 14px;
    line-height: 16px;
  }

  small {
    font-size: 14px;
    line-height: 16px;
    color: #6F6F6F;
  }

  ${({ subtotal }) => (subtotal && css`
    background: #2CD4DF;
    padding: 5px;
    border-radius: 3px;
    span, small {
      font-weight: 700;
      color: ${({ theme }) => theme.colors.grey[10]};
    }
  `)};
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 22px;
  > div {
    width: 100%;
  }

  button {
    padding: 7px 24px;
    background: ${({ theme }) => theme.colors.secondary.main};
    border: none;
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.grey[10]};
    font-weight: 500;
    width: 40%;
    font-size: 14px;

    :hover {
      transition: all .35s ease;
      opacity: .8;
      filter: brightness(1);

    }

    :first-child {
      background: #E2EBEA;
      color: #3A3A3A;
    }

  }

  @media (max-width: 478px) {
    flex-direction: column;
    > div {
      gap: 8px;
    }
    button {
      width: 100%;
    }
  }
`;

interface ButtonSelectProps {
  selected?: boolean,
}

export const ButtonSelect = styled.button<ButtonSelectProps>`
  padding: 7px 24px;
  background: ${({ theme, selected }) => (!selected ? theme.colors.secondary.main : theme.colors.grey[40])};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.grey[10]};
  font-weight: 500;
  width: 100%;
  font-size: 14px;
  :hover {
    transition: all .35s ease;
    opacity: ${({ selected }) => (!selected ? '.8' : '1')};
  }

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.grey[40]};
    :hover {
      opacity: 1;
    }
  }
`;
