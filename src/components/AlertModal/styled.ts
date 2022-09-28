import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem;
  background: ${({ theme }) => theme.colors.grey[10]};
  border-radius: 1rem;

  gap: 2.4rem;
  max-width: 531rem;

  transition: all .30s ease;

  .header__modal {
    > h1 {
      color: ${({ theme }) => theme.colors.grey[50]};
      text-align: left;
    }
  }

  .body__modal {
    color: ${({ theme }) => theme.colors.grey[50]};
    font-size: 1.2rem;
    font-weight: 400;
  }

  .footer__modal {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }

  @media (max-width: 318px) {
    padding: 16px;

    .header__modal {
      > h1 {
        font-size: 20px;
      }
    }

    .footer__modal {
      justify-content: flex-start;
      flex-direction: column;
      width: 100%;
      button {
        width: 100%;
      }
    }
  }
`;
