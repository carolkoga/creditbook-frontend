import styled from 'styled-components';

export const TooltipIcon = styled.div`
  background: ${({ theme }) => theme.colors.grey[30]};
  color: ${({ theme }) => theme.colors.grey[50]};
  padding: 1px 8px;
  border-radius: 50%;
  cursor: pointer;

`;
