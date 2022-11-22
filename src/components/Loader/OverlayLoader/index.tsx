import ReactPortal from '@components/ReactPortal';

import Loader from '..';

import { StyledOverlay } from './styled';

export default function OverlayLoader({ loading }: { loading: boolean }) {
  if (!loading) return null;
  return (
    <ReactPortal>
      <StyledOverlay>
        <Loader loading={loading} />
      </StyledOverlay>
    </ReactPortal>
  );
}
