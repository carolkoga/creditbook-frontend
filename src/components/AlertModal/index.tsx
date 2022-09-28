/* eslint-disable react/require-default-props */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Overlay } from '@components/Overlay';
import ReactPortal from '@components/ReactPortal';
import { Button } from '@components/Button';

import { Container } from './styled';

interface IProps {
  title: string,
  description?: string | null,
  type: 'danger' | 'default',
  isVisible: boolean,
  isLoading: boolean,

  confirm: {
    label: string,
    onConfirmButton: () => void,
  },

  cancel: {
    label: string,
    onCancelButton: () => void,
  },
}

export default function AlertModal({
  title,
  description,
  type,
  isVisible,
  isLoading,
  confirm,
  cancel,
}: IProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <ReactPortal>
      <Overlay>
        <Container>
          <div className="header__modal">
            <h1>{title}</h1>
          </div>

          {description && (
            <div className="body__modal">
              <p>{description}</p>
            </div>
          )}

          <div className="footer__modal">
            <Button
              variant="white"
              onClick={() => cancel.onCancelButton()}
            >
              {cancel.label}
            </Button>
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
};
