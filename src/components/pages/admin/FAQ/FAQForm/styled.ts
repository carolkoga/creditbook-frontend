import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem;
  background: ${({ theme }) => theme.colors.grey[10]};
  border-radius: 1rem;

  gap: 2.4rem;
  max-width: 557px;
  width: 100%;

  margin: auto;

  transition: all .30s ease;
  h1 {
    color: ${({ theme }) => theme.colors.grey[50]};
    text-align: left;
  }


  form {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .content:first-child {
      > div {
        width: 100%;
      }
    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 12px;
    }
  }

  @media (max-width: 318px) {
    padding: 16px;
    h1 {
      font-size: 20px;
    }

    .actions {
      justify-content: flex-start;
      flex-direction: column;
      width: 100%;
      button {
        width: 100%;
      }
    }
  }
`;
