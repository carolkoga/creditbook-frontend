import styled, { css } from 'styled-components';

type SizesButton = 'small' | 'small-large' | 'large' | 'outline-filled-round' | 'x-large';
type VariantsButton = 'default' | 'secondary' | 'white' | 'dark';

interface ButtonProps {
  size?: SizesButton,
  variant?: VariantsButton,
}

const sizesButton = {
  small: css`
    padding: 5px 30px;
    font-size: 13px;
  `,

  'small-large': css`
    padding: 3px 30px;
    font-size: 13px;
  `,

  large: css`
    padding: 11px 92px;
    font-size: 13px;
    line-height: 15px;
    font-weight: 500;
  `,

  'outline-filled-round': css`
    padding: 10px 62px;
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
    border-radius: 10px;
  `,

  'x-large': css`
    padding: 5px 92px;
    font-size: 13px;
    line-height: 15px;
  `,
};

const variantsButton = {
  default: css`
    background: ${({ theme }) => theme.colors.primary.main};
    &:hover {
      filter: brightness(1.3);
    }
  `,

  secondary: css`
    background: ${({ theme }) => theme.colors.secondary.main};
  `,

  white: css`
    background: ${({ theme }) => theme.colors.grey[30]};
    border: 1px solid ${({ theme }) => theme.colors.grey[40]};
    color: ${({ theme }) => theme.colors.grey[80]};
  `,

  dark: css`
    background: ${({ theme }) => theme.colors.grey[50]};
    color: ${({ theme }) => theme.colors.grey[10]};
  `,
};

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: ${({ theme }) => theme.colors.grey[10]};
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  transition: all .35s ease-in-out;
  &[disabled] {
    cursor: not-allowed;
    filter: brightness(0.7);

    &:hover {
      filter: brightness(0.7);
    }
  }
  ${({ size }) => (size ? sizesButton[size] : sizesButton['small-large'])}
  ${({ variant }) => (variant ? variantsButton[variant] : variantsButton.default)}
`;
