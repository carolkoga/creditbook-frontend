import styled, { css } from 'styled-components';

interface ContainerProps {
  hasError?: boolean,
  noAlign?: boolean,
  direction?: 'horizontal' | 'vertical'
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    flex-direction: row;
    flex-direction: column;
    justify-content: flex-start;
    align-items:  ${({ noAlign }) => (noAlign ? 'flex-start' : 'center')};
    gap: 0 16px;

    ${({ direction }) => direction === 'vertical' && css`
      flex-direction: column;
      align-items: flex-start;
      gap: 10px 0;

    `}
  }

  ${({ hasError }) => hasError && css`
    input, select, textarea, div {
      border-color: #F16565 !important;
    }

    input, label, input::placeholder {
      color: #F16565 !important;
    }
  `};
`;

export const Label = styled.label`
  font-size: 14px;
  line-height: 24px;
  color: #434242;

  + input {
    align-self: center;
  }
`;

export const ErrorMessage = styled.small`
  color: #F16565;
  font-size: 12px;
  font-weight: 400;
  margin-top: 16px;
`;
