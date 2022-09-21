import { Direction } from '@components/Direction';
import styled from 'styled-components';

export const Fieldset = styled(Direction).attrs(() => ({ as: 'fieldset' }))`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 100%;

  border: none;
  legend {
    font-size: 1.5rem;
    line-height: 24px;
    margin-bottom: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary.main};
  }

  > div {
    > strong {
      font-size: 1.5rem;
    }

    label {
      font-size: 13px;
    }
  }

`;
