import styled from 'styled-components';

export const ListCreditCard = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 14px;
  width: 100%;
  li {
    flex: 1;
    list-style: none;
  }

  @media (max-width: 790px) {
    li {
      flex: none;

      button {
        margin-left: 14px
      }
    }
  }

  @media (max-width: 320px) {
    li {
      width: 80%;
      div {
        flex-direction: column;
        button {
          margin-left: 0;
        }
      }
    }
  }
`;
