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
    background: #150882;
  `,

  secondary: css`
    background: #5DC8C4;
  `,

  white: css`
    background: #E8E6F3;
    color: #151515;
  `,
};

export const Button = styled.button<ButtonProps>`
  border: none;
  color: #FFF;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  ${({ size }) => (size ? sizesButton[size] : sizesButton['small-large'])}
  ${({ variant }) => (variant ? variantsButton[variant] : variantsButton.default)}
`;
