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
  loading?: boolean,
}

export default function NewCreditCard({
  isVisible, onCancel, onSubmit, title, submitLabel, loading,
}: IProps) {
  if (!isVisible) return null;

  return (
    <ReactPortal>
      <Overlay style={{ zIndex: 1000 }}>
        <Content>
          <CreditCardForm title={title} onSubmit={onSubmit}>
            <Direction direction="horizontal" gap="5px" className="actions">
              <Button isLoading={loading}>
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
  loading: false,
};
