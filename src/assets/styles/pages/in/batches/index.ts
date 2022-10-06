import styled from 'styled-components';

export const WrapperActionsForm = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;

  button {
    :last-child {
      border: 1px solid ${({ theme }) => theme.colors.others.actions.danger};
      color: ${({ theme }) => theme.colors.others.actions.danger};
      background: none;

      transition: all .36s ease-in;
      :hover {
          border: 1px solid ${({ theme }) => theme.colors.others.actions.danger};
          background: ${({ theme }) => theme.colors.others.actions.danger};
          color: ${({ theme }) => theme.colors.grey[10]};
      }
    }
  }
`;
