import styled, { css } from 'styled-components';

type SizesButton = 'small' | 'small-large';
type VariantsButton = 'default' | 'secondary';

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
};

const variantsButton = {
  default: css`
    background: #150882;
  `,

  secondary: css`
    background: #5DC8C4;
  `,
};

export const Button = styled.button<ButtonProps>`
  color: #FFF;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  ${({ size }) => (size ? sizesButton[size] : sizesButton['small-large'])}
  ${({ variant }) => (variant ? variantsButton[variant] : variantsButton.default)}
`;
