import { Tooltip as TooltipAntd } from 'antd';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode
  title: string
}

export function Tooltip({ children, title }: IProps) {
  return (
    <TooltipAntd title={title}>
      {children}
    </TooltipAntd>
  );
}
