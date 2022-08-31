import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  html {
    /* 10px = 1rem | 25px = 2.5rem */
    /* rem = px / 10 */
    font-size: 62.5%;
  }

  /* Works on Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #C4C4C4C4 #FFF;
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: #FFF;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #C4C4C4C4;
    border-radius: 20px;
    border: 3px solid #FFF;
  }

  html, body {
    height: 100%;
  }

  body {
    background: ${({ theme }) => theme.colors.grey[20]};
    color: ${({ theme }) => theme.colors.grey[70]};
    font-family: 'Roboto', sans-serif;
    font-size: 1.2rem;
    font-weight: 400;
    overflow-x: hidden;
  }

  button, input, textarea {
    font-family: 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

`;
