import { createGlobalStyle } from 'styled-components';
import { light } from './themes/light';

export default createGlobalStyle<{ theme: typeof light }>`
    @font-face {
      font-family: 'MyFontRegular';
      src: url('/fonts/NexaRegular.otf') format('opentype');
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: 'MyFontBold';
      src: url('/fonts/NexaBold.otf') format('opentype');
      font-weight: bold;
      font-style: normal;
    }

    @font-face {
      font-family: 'MyFontLight';
      src: url('/fonts/NexaLight.otf') format('opentype');
      font-weight: 300;
      font-style: normal;
    }


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
    font-family: 'MyFontRegular', sans-serif;
    font-size: 1.2rem;
    font-weight: 400;
    overflow-x: hidden;
    text-align: justify;
  }

  button, input, textarea {
    font-family: 'MyFontRegular', sans-serif;
  }

  button {
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6, strong {
        font-family: 'MyFontBold', sans-serif;
    }

    p, span {
        font-family: 'MyFontLight', sans-serif;
    }

    b {
        font-family: 'MyFontBold', sans-serif;
    }
`;
