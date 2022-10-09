import { ReactNode } from 'react';
import { StyledSidebar } from './styled';

interface IProps {
  children: ReactNode
}

export default function SidebarAdmin({ children }: IProps) {
  return (
    <StyledSidebar
      breakpoint="lg"
      collapsedWidth={0}
      trigger={null}
    >
      {children}
    </StyledSidebar>
  );
}
