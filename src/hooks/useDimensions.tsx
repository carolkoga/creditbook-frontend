import { useCallback, useEffect, useState } from 'react';

interface DimensionsType {
  width: Number | null,
  height: Number | null,
}

export default function useDimensions() {
  const hasWindow = typeof window !== 'undefined';
  const [dimensions, setDimensions] = useState({
    width: null,
    height: null,
  } as DimensionsType);

  const dimensionsOverlimit = useCallback((maxWidth?: Number, maxHeight?: Number) => {
    const widthOverlimit = maxWidth && (dimensions.width as Number) > maxWidth;
    const heightOverlimit = maxHeight && (dimensions.height as Number) > maxHeight;

    return { widthOverlimit, heightOverlimit };
  }, [dimensions]);

  const handleResizeWindowDimensions = useCallback(() => {
    setTimeout(() => {
      if (hasWindow) {
        setDimensions((state) => ({
          ...state,
          width: window.innerWidth,
          height: window.innerHeight,
        }));
      }
    }, 300);
  }, [hasWindow]);

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindowDimensions);
    handleResizeWindowDimensions();
    return () => window.removeEventListener('resize', handleResizeWindowDimensions);
  }, [handleResizeWindowDimensions]);

  return {
    dimensions,
    dimensionsOverlimit: (maxWidth?: Number, maxHeight?: Number) => (
      dimensionsOverlimit(maxWidth, maxHeight)),
  };
}
