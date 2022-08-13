import ReactSelect from 'react-select';
import ReactSelectAsync from 'react-select/async';
import styled, { css } from 'styled-components';

export type OptionType = { label: string; value: string };

const globalStyle = css`
  .select {

    &__menu {
      font-size: 12px;
      background: #F5F5F7;
      & {
        &-list {
          background: #F5F5F7;
          .select__option {

            &.select__option--is--selected {

            }

            &--is--focused {

            }
          }
        }
      }
    }

    &__control {
      border-radius: 10px;
      max-width: ${({ width }: { width?: number}) => (!width ? '250px' : `${width}px`)};
      width: 100%;
      font-size: 12px;
      background: #F5F5F7;
      &--is-focused {
        border-color: #152088;
        box-shadow: none;
      }
    }
  }
`;

export const Select = styled(ReactSelect).attrs(() => ({ classNamePrefix: 'select' }))`
  ${globalStyle};
`;

export const AsyncSelect = styled(ReactSelectAsync).attrs(() => ({ classNamePrefix: 'select' }))`
  ${globalStyle};
`;
