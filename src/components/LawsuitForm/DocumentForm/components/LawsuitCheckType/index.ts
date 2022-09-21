import styled, { css } from 'styled-components';

interface LawsuitCheckTypeProps {
  check: boolean;
}

export const LawsuitCheckType = styled.label<LawsuitCheckTypeProps>`
  input {
    display: none;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.primary.main};
  background: 1px solid ${({ theme }) => theme.colors.grey[10]};
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  cursor: pointer;
  padding: 3px 35px;
  border-radius: 5px;
  transition: all .25s ease-in;

  ${({ check, theme }) => check && css`
    background: ${theme.colors.primary.main};
    color: ${theme.colors.grey[10]};
  `};
`;
