import styled from 'styled-components';

export const TextContainer = styled.div`
  max-width: 531px;
  p {
    color: #424242;
    font-size: 18px;
    line-height: 24px;
    text-align: justify;

    + p {
      margin-top: 42px;
    }
  }
`;
