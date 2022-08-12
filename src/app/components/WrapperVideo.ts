import styled from 'styled-components';

interface WrapperVideoProps {
  width?: string,
  height?: string,
}

export const WrapperVideo = styled.div<WrapperVideoProps>`
  width: ${({ width }) => (!width ? '527px' : width)};
  height: ${({ height }) => (!height ? '360px' : height)};
  border-radius: 10px;
  border: 1px solid #150881;

  iframe {
    border-radius: 10px;
  }

  @media screen and (max-width: 1128px){
    border-width: 0;
  }

  @media screen and (max-width: 568px){
    width: 450px;
    height: 308px;
  }

  @media screen and (max-width: 458px){
    width: 330px;
    height: 205px;
    border-width: 0;
  }

  @media screen and (max-width: 348px){
    width: 100%;
    height: 250px;
    border: none;
  }
`;
