import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 62.5%;
  }

  body {
    background: #F9F9F9;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    overflow-x: hidden;
  }

  button, input-security, textarea {
    font-family: 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

`;
