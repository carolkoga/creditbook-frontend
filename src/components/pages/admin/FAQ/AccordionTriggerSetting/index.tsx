import { forwardRef, ReactNode } from 'react';
import { AccordionTriggerProps } from '@radix-ui/react-accordion';

import { StyledArrow, StyledTrigger } from '@styles/accordion';
import { Button } from '@components/Button';
import { ActionsContainer, StyledHeader } from './styled';

interface ChildrenType { children: ReactNode }
export type AccordionTriggerType = ChildrenType & AccordionTriggerProps & {
  onEdit: () => void,
  onDelete: () => void,
};

const AccordionTriggerSetting = forwardRef(
  ({
    children, onEdit, onDelete, ...props
  }: AccordionTriggerType, forwardedRef: any) => (
    <StyledHeader>
      <StyledTrigger {...props} ref={forwardedRef}>
        {children}
        <StyledArrow aria-hidden />
      </StyledTrigger>
      <ActionsContainer>
        <Button onClick={onEdit}>Editar</Button>
        <Button variant="danger" onClick={onDelete}>Deletar</Button>
      </ActionsContainer>
    </StyledHeader>
  ),
);

export default AccordionTriggerSetting;
