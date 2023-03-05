import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
`;
