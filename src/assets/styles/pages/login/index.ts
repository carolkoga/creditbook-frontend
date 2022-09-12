import styled from 'styled-components';

export const WrapperForm = styled.div`
  max-width: 313px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  gap: 11px;
  margin-top: 55px;

  form {
    width: 100%;
    input, button {
      width: 100%;
    }

    display: flex;
    flex-direction: column;
    gap: 16px 0;

    label {
      font-weight: 600;
    }

    button {
      margin-top: 27px;
    }
  }

  .actions {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 11px;

    .forget__password {
      color: ${({ theme }) => theme.colors.grey[50]};
      font-size: 12px;
      text-decoration: none;
    }
  }
`;
