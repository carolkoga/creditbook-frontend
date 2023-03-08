import styled from 'styled-components';
import { WrapperRadio } from '../Buyer/styled';

export const Container = styled(WrapperRadio)`
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;

    label {
      flex: 1;
    }
  }
`;
