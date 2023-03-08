import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 480px) {
    padding: auto 2.4rem
  }
`;

export const Action = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 2.4rem auto;

  button + button {
    margin-left: 12px;
  }

  @media (max-width: 517px) {
    flex-direction: column-reverse;
    button {
      flex: 1;
      width: 100%;
      margin-left: 0px !important;

      :last-child {
        margin-bottom: 12px;
      }
    }
  }
`;
