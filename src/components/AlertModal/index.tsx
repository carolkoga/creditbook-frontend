/* eslint-disable react/no-danger */
/* eslint-disable react/require-default-props */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/no-unescaped-entities */
import { CSSProperties } from 'styled-components';

import { Overlay } from '@components/Overlay';
import ReactPortal from '@components/ReactPortal';
import { Button } from '@components/Button';

import { ReactNode } from 'react';
import { Container, Title } from './styled';

interface IProps {
  children?: ReactNode,

  title: string,
  description?: string | null,
  type: 'danger' | 'default',
  titleColor?: 'warning'
  isVisible: boolean,
  isLoading?: boolean,

  width?: string,
  _css?: CSSProperties | undefined,

  confirm: {
    label: string,
    onConfirmButton: () => void,
  },

  cancel?: {
    label: string,
    onCancelButton: () => void,
  },
}

export default function AlertModal({
  children,
  title,
  description,
  type,
  isVisible,
  isLoading,
  confirm,
  cancel,
  width,
  titleColor,
  _css,
}: IProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <ReactPortal>
      <Overlay style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container width={width} style={_css}>
          <div className="header__modal">
            <Title color={titleColor}>{title}</Title>
          </div>

          {description && (
            <div className="body__modal">
              <p dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          )}

          {children && (
            <div className="body__modal">
              {children}
            </div>
          )}

          <div className="footer__modal">
            {cancel?.label && (
              <Button
                variant="white"
                onClick={() => cancel.onCancelButton()}
              >
                {cancel.label}
              </Button>
            )}
            <Button
              variant={type}
              onClick={() => confirm.onConfirmButton()}
              isLoading={isLoading}
            >
              {confirm.label}
            </Button>
          </div>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

AlertModal.defaultProps = {
  description: null,
  type: 'default',
  _css: undefined,
};
