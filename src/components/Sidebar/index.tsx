import useOnclickOutside from 'react-cool-onclickoutside';

import ReactPortal from '@components/ReactPortal';
import useDimensions from '@hooks/useDimensions';
import useSidebar from '@hooks/useSidebar';

import CoreSidebar from './sidebar';
import { FloatSidebar } from './styled';

export default function Sidebar() {
  const { isCollapsed, handleControlSidebar } = useSidebar();
  const { dimensionsOverlimit } = useDimensions();
  const { widthOverlimit } = dimensionsOverlimit(914);
  const ref = useOnclickOutside(() => {
    if (!widthOverlimit) {
      handleControlSidebar(false);
    }
  });

  return (
    <>
      {widthOverlimit && <CoreSidebar />}
      {!widthOverlimit && (
        <ReactPortal containerId="float-sidebar">
          <FloatSidebar isVisible={isCollapsed && !widthOverlimit} ref={ref}>
            <CoreSidebar
              smallDevice={!isCollapsed && !widthOverlimit}
            />
          </FloatSidebar>
        </ReactPortal>
      )}
    </>
  );
}
