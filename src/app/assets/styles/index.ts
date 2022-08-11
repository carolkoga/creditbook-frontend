import styled from 'styled-components';

export const Main = styled.main`
  padding: 56px;

  @media screen and (max-width: 1200px) {
    padding: 42px;
  }

  @media screen and (max-width: 700px) {
    padding: 32px;
  }

  @media screen and (max-width: 400px) {
    padding: 24px;
  }

  @media screen and (max-width: 300px) {
    padding: 18px;
  }
`;
