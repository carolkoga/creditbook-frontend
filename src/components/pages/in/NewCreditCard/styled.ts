import styled from 'styled-components';

export const Content = styled.div`
  background: ${({ theme }) => theme.colors.grey[10]};
  border-radius: 10px;

  margin: auto;
  transform: translateY(50%);

  max-width: 310px;

  .actions {
    width: 100%;
  }
`;
