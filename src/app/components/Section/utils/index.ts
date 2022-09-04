import { css } from 'styled-components';

export const sectionBgColors = {
  white: css`
    background: ${({ theme }) => theme.colors.grey[10]};
    padding: 24px;
  `,

  light: css`
    background: ${({ theme }) => theme.colors.grey[30]};
    padding: 24px;
  `,
};

export const sectionTextColors = {
  default: css`
    color: ${({ theme }) => theme.colors.primary.main};
  `,

  secondary: css`
    color: ${({ theme }) => theme.colors.secondary.main};
  `,

  dark: css`
    color: ${({ theme }) => theme.colors.grey[50]};
  `,
};
