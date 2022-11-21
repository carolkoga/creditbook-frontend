import { Alert, AlertProps } from 'antd';
import { Container } from './styled';

interface FloatWarningProps {
  _alertProps: AlertProps,
  isVisible?: boolean
}

export default function FloatWarning({ _alertProps, isVisible }: FloatWarningProps) {
  if (!isVisible) return null;

  return (
    <Container>
      <Alert
        style={{ borderRadius: '10px' }}
        {..._alertProps}
      />
    </Container>
  );
}

FloatWarning.defaultProps = {
  isVisible: false,
};
