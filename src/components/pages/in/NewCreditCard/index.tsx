import CreditCardForm from '@components/CreditCardForm';
import { Overlay } from '@components/Overlay';
import ReactPortal from '@components/ReactPortal';
import { Content } from './styled';

interface IProps {
  isVisible: boolean,
  onClose: any,
}

export default function NewCreditCard({
  isVisible,
  onClose,
}: IProps) {
  if (!isVisible) return null;

  return (
    <ReactPortal>
      <Overlay style={{ zIndex: 1000 }}>
        <Content>
          <CreditCardForm onClose={onClose} />
        </Content>
      </Overlay>
    </ReactPortal>
  );
}

NewCreditCard.defaultProps = {
  title: null,
  loading: false,
};
