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
  max-width: 657px;
  width: 100% !important;
  .wrapper__premium {
    margin-top: 42px;

    text-align: left;
  }

  @media (max-width: 763px) {
    margin-top: 262px;
    padding: 53px 24px;

    .header {
      align-items: center;
    }
  }

  @media (max-width: 340px) {
    padding: 53px 24px;
    width: 300px;
  }
`;

export const PlanList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 763px) {
    flex-direction: column;
  }
`;

export const PlanContainer = styled.div<PlanProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.grey[10]};
  min-height: 225px;
  height: 100%;
  min-width: 260px;
  width: 100%;
  flex: 1;

  .container-advantage {
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .advantage {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.grey[70]};

      .advantage + .advantage {
        margin-top: 24px;
      }
    }
  }

  p {
    text-align: center;
    width: 100%;
  }

  @media (max-width: 328px) {
    min-width: 100%;
  }
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
  width: 100%;

  h2 {
    text-align: center;
    font-size: 18px;
    line-height: 29px;
    color: ${({ theme }) => theme.colors.grey[10]};
    width: 100%;

    span {
      font-size: 12px;
      color: #d2cded;
    }
  }

  ${({ highlight }) => (highlight && css`
    background: ${({ theme }) => theme.colors.primary.main};
    filter: brightness(100%);
    opacity: 1;

  `)};
`;

export const PlanContent = styled.div`
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
    flex: 1;
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
  type?: 'checkbox'
}

export const ButtonSelect = styled.label<ButtonSelectProps>`
  padding: 7px 24px;
  background: ${({ theme, selected }) => (!selected ? theme.colors.secondary.main : theme.colors.grey[40])};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.grey[10]};
  font-weight: 500;
  font-size: 14px;
  cursor: ${({ selected }) => (selected ? 'not-allowed' : 'cursor')};

  input {
    visibility: hidden;
    position: absolute;
    top: -9999999;
    left: -9999999;
  }

  :hover {
    transition: all .35s ease;
    opacity: ${({ selected }) => (!selected ? '.8' : '1')};
  }

  ${({ type, selected, theme }) => (type === 'checkbox' && selected && css`
    cursor: pointer;
    background: ${theme.colors.others.actions.danger};
    filter: brightness(90%);
  `)}
`;
