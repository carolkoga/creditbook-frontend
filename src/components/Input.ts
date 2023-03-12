import styled, { css } from 'styled-components';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';

const commonStyles = css`
  border: none;
  background: #F5F5F7;
  border-radius: 5px;
  padding: 8px;
  border: 1px solid #F5F5F7;

  :focus {
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
  }

  &[type="number"] {
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button, ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const Input = styled.input`
  ${commonStyles};
`;

export const MaskInput = styled(IMaskInput)`
  ${commonStyles};
`;

export const NumericInputStyled = styled(NumericFormat)`
  ${commonStyles};
`;

export const Textarea = styled.textarea`
  max-height: 143px;
  min-height: 143px;
  resize: none;
  ${commonStyles};
`;
