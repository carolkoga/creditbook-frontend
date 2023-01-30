import styled from 'styled-components';
import { Overlay } from '@components/Overlay';

export const StyledOverlay = styled(Overlay)`
  background: rgba(255, 255, 255, 1);
  opacity: 99%;

  .loader {
    margin: auto;
    transform: translateY(50%);
  }
`;
