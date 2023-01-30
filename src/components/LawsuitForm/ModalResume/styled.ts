import styled from 'styled-components';
import { Overlay } from '@components/Overlay';

export const OverlayStyled = styled(Overlay)`
  z-index: 1000;
  padding: 0;
  overflow-y: scroll;
  background: #fff;
  flex-direction: column;
  padding: 54px;
  height: 100vh;
  display: block;

  @media (max-width: 630px) {
    padding: 24px;
  }
`;
