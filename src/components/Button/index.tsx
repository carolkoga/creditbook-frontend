import LinkRouter, { LinkProps } from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { StyleButton, ButtonProps } from './styled';

interface IPropsCommon extends ButtonProps {
  children: ReactNode,
  isLoading?: boolean,
}

type IButtonProps = IPropsCommon & ButtonHTMLAttributes<HTMLButtonElement>

interface ILinkProps extends IPropsCommon, LinkProps {}

export function Button({
  children, size, variant, isLoading, ...restAttributes
}: IButtonProps) {
  return (
    <StyleButton
      size={size}
      variant={variant}
      disabled={isLoading}
      {...restAttributes}
    >
      {children}
      <TailSpin
        height="16"
        width="16"
        color="#FFFF"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperClass=""
        visible={isLoading}
      />
    </StyleButton>
  );
}

export function Link({
  children, size, variant, isLoading, ...restAttributes
}: ILinkProps) {
  return (
    <LinkRouter {...restAttributes}>
      <StyleButton as="a" variant={variant} size={size}>
        {children}
      </StyleButton>
    </LinkRouter>
  );
}

Button.defaultProps = {
  isLoading: null,
};

Link.defaultProps = {
  isLoading: null,
};
