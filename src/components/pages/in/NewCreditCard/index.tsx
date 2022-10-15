import { Button } from '@components/Button';
import CreditCardForm from '@components/CreditCardForm';
import { Direction } from '@components/Direction';
import { Overlay } from '@components/Overlay';
import ReactPortal from '@components/ReactPortal';
import { Content } from './styled';

interface IProps {
  isVisible: boolean,
  onCancel: () => void,
  onSubmit: () => void,
  submitLabel: string,
  title?: string | null,
}

export default function NewCreditCard({
  isVisible, onCancel, onSubmit, title, submitLabel,
}: IProps) {
  if (!isVisible) return null;

  return (
    <ReactPortal>
      <Overlay>
        <Content>
          <CreditCardForm title={title} onSubmit={onSubmit}>
            <Direction direction="horizontal" gap="5px" className="actions">
              <Button>
                {submitLabel}
              </Button>

              <Button variant="white" onClick={() => onCancel()}>
                Cancelar
              </Button>
            </Direction>
          </CreditCardForm>
        </Content>
      </Overlay>
    </ReactPortal>
  );
}

NewCreditCard.defaultProps = {
  title: null,
};
