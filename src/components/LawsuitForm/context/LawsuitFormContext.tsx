import useDimensions from '@hooks/useDimensions';
import { createContext, ReactNode, useMemo } from 'react';

interface LawsuitFormContextProps {
  formGroupDirection: 'horizontal' | 'vertical',
}

export const LawsuitFormContext = createContext({} as LawsuitFormContextProps);

type ChildrenProp = { children: ReactNode };

export function LawsuitFormProvider({ children }: ChildrenProp) {
  const { dimensionsOverlimit } = useDimensions();
  const { widthOverlimit } = dimensionsOverlimit(460);
  const values = useMemo(() => ({
    formGroupDirection: !widthOverlimit ? 'vertical' : 'horizontal',
  }), [widthOverlimit]);

  return (
    <LawsuitFormContext.Provider value={values as LawsuitFormContextProps}>
      {children}
    </LawsuitFormContext.Provider>
  );
}
