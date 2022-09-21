import styled, { css } from 'styled-components';
import { IMaskInput } from 'react-imask';

const commonStyles = css`
  border: none;
  background: #F5F5F7;
  border-radius: 5px;
  padding: 8px;
  border: 1px solid #F5F5F7;

  :focus {
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
  }
`;

export const Input = styled.input`
  ${commonStyles};
`;

export const MaskInput = styled(IMaskInput)`
  ${commonStyles};
`;

export const Textarea = styled.textarea`
  max-height: 143px;
  min-height: 143px;
  resize: none;
  ${commonStyles};
`;
