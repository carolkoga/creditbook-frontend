import styled from 'styled-components';

export const Actions = styled.div`
  a {
    padding: 6px 34px;
    background: ${({ theme }) => theme.colors.secondary.main};
    border-radius: 5px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.grey[10]};
    font-weight: 500;
    font-size: 12px;

    + a {
      margin-left: 8px;
      background: ${({ theme }) => theme.colors.primary.main};
    }

  }
`;
