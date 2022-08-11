import styled from 'styled-components';

interface IContainerProps {
  width: number | null,
}

export const Container = styled.form<IContainerProps>`
  border: 1px solid #D5DDE0;
  background: #F9F9F9;
  width: ${({ width }) => (!width ? '25.2rem' : `${(width / 10)}rem`)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .6rem 1.2rem;
  border-radius: .5rem;

  input, button {
    border: none;
    background: none;
  }

  input[type="search"] {
    width: 100%;
    height: 100%;
    color: #939393;
    ::-webkit-search-cancel-button {
      appearance: none;
    }
  }

  :focus {
    border-color: #150888;
  }
  button {
    position: relative;
    width: 20px;
    height: 20px;
  }
`;
