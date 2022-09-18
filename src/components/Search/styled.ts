import styled from 'styled-components';

export const Container = styled.form`
  border: 1px solid #D5DDE0;
  background: #F9F9F9;
  max-width: 52rem;
  width: 100%;
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
    color: ${({ theme }) => theme.colors.grey[40]};
    ::-webkit-search-cancel-button {
      appearance: none;
    }
  }

  :focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
  button {
    position: relative;
    width: 20px;
    height: 20px;
  }
`;
