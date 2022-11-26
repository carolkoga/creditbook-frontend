import styled from 'styled-components';

interface WrapperVideoProps {
  width?: string,
  height?: string,
}

export const WrapperVideo = styled.div<WrapperVideoProps>`
  width: ${({ width }) => (!width ? '627px' : width)};
  height: ${({ height }) => (!height ? '460px' : height)};
  border-radius: 10px;
  .yt-lite {
    border-radius: 10px;
    height: 100%;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.primary.main};

    button {
      border: none;
    }
  }

    @media screen and (max-width: 1128px){
    border-width: 0;
  }

  @media screen and (max-width: 727px){
    width: 100%;
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
