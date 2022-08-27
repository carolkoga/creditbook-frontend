import styled, { css } from 'styled-components';

type SizesButton = 'small' | 'small-large' | 'large' | 'x-large';
type VariantsButton = 'default' | 'secondary' | 'white';

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
    padding: 3px 43px;
    font-size: 13px;
  `,

  large: css`
    padding: 11px 92px;
    font-size: 13px;
    line-height: 15px;
    font-weight: 500;
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
  `,

  secondary: css`
    background: ${({ theme }) => theme.colors.secondary.main};
  `,

  white: css`
    background: ${({ theme }) => theme.colors.grey[30]};
    color: #151515;
  `,
};

export const Button = styled.button<ButtonProps>`
  border: none;
  color: ${({ theme }) => theme.colors.grey[10]};
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  ${({ size }) => (size ? sizesButton[size] : sizesButton['small-large'])}
  ${({ variant }) => (variant ? variantsButton[variant] : variantsButton.default)}
`;
