import ReactPortal from '@components/ReactPortal';
import { Oval } from 'react-loader-spinner';
import { StyledOverlay } from './styled';

export default function Loader({ loading }: { loading: boolean }) {
  if (!loading) return null;
  return (
    <ReactPortal>
      <StyledOverlay>
        <Oval
          height={120}
          width={120}
          color="#150882"
          visible={loading}
          ariaLabel="oval-loading"
          secondaryColor="#150882"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </StyledOverlay>
    </ReactPortal>
  );
}
