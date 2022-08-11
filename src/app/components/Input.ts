import styled, { css } from 'styled-components';

const commonStyles = css`
  border: none;
  background: #F5F5F7;
  border-radius: 5px;
  padding: 8px;
  border: 1px solid #F5F5F7;

  :focus {
    border: 1px solid #152088;
  }
`;

export const Input = styled.input`
  ${commonStyles};
`;

export const Textarea = styled.textarea`
  max-height: 143px;
  height: 143px;
  resize: none;
  ${commonStyles};
`;
