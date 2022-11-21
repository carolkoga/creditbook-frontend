import { ReactNode } from 'react';
import { StyleFloatContainer } from './styled';

export interface FloatWarningContainerProps {
  isVisible: boolean,
  children: ReactNode
}

export default function FloatWarningContainer({ isVisible, children }: FloatWarningContainerProps) {
  if (!isVisible) return null;

  return (
    <StyleFloatContainer>
      {children}
    </StyleFloatContainer>
  );
}
