import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;

    font-family: 62.5%;
  }

  body {
    background: ${({ theme }) => theme.colors.grey[20]};
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    overflow-x: hidden;
  }

  button, input, textarea {
    font-family: 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

`;
