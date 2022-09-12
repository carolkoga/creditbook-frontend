import styled, { css } from 'styled-components';

interface ContainerProps {
  hasError?: boolean,
  noAlign?: boolean,
  direction?: 'horizontal' | 'vertical'
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  .content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items:  ${({ noAlign }) => (noAlign ? 'flex-start' : 'center')};
    gap: 0 16px;

    ${({ direction }) => direction === 'vertical' && css`
      flex-direction: column;
      align-items: flex-start;
      gap: 10px 0;

      input, textarea {
        width: 100%;
        align-self: flex-start;
      }
    `}
    input, textarea {
      width: 100%;
      flex: 1;
      align-self: flex-start;
    }

  }

  ${({ hasError }) => hasError && css`
    input, select, textarea, div {
      border-color: #F16565 !important;
    }

    input, label, input::placeholder {
      color: #F16565 !important;
    }
  `};

  ${({ direction }) => direction === 'vertical' && css`
    width: 100% !important;
  `}
`;

export const Label = styled.label`
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.grey[50]};

  + input {
    align-self: center;
  }
`;

export const ErrorMessage = styled.small`
  color: #F16565;
  font-size: 12px;
  font-weight: 400;
  margin-top: 8px;
`;
