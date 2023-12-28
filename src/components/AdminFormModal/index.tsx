/* eslint-disable react/no-danger */
/* eslint-disable react/require-default-props */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/no-unescaped-entities */

import { Overlay } from '@components/Overlay';
import ReactPortal from '@components/ReactPortal';
import { Button } from '@components/Button';

import { Input } from '@components/Input';
import { Container, Title } from './styled';

type IProps = { onCancel: any, onConfirm: any };

export default function AdminFormModal({ onCancel, onConfirm }: IProps) {
  return (
    <ReactPortal>
      <Overlay style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container>
          <div className="header__modal">
            <Title>Criar Administrador</Title>
          </div>

          <div className="body__modal">
            <form style={{ display: 'flex', flexDirection: 'column', gap: '6px' }} onSubmit={onConfirm}>
              <Input type="text" placeholder="Nome Completo" name="fullname" />
              <Input type="email" placeholder="Email" name="email" />
              <Input type="text" placeholder="Senha" name="password" />
              <Input type="text" placeholder="Confirmar Senha" name="passwordConfirmation" />

              <br />

              <div className="footer__modal">
                <Button
                  variant="white"
                  onClick={onCancel}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                >
                  Confirmar
                </Button>
              </div>
            </form>
          </div>

        </Container>
      </Overlay>
    </ReactPortal>
  );
}
