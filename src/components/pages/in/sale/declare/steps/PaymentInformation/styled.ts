import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-bottom: 2.4rem;
`;

export const MaxWidth = styled.div<{ maxWidth?: number | string }>`
  max-width: ${({ maxWidth }) => (typeof maxWidth === 'undefined'
    ? '100%'
    : typeof maxWidth === 'number'
      ? `${maxWidth}px`
      : maxWidth)};
`;

export const BankInfo = styled.div`
  max-width: 1050px;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
