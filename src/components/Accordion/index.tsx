import { forwardRef, ReactNode } from 'react';
import { AccordionContentProps, AccordionTriggerProps } from '@radix-ui/react-accordion';
import {
  StyledAccordion,
  StyledArrow, StyledContent, StyledContentText, StyledItem, StyledTrigger,
} from '@styles/accordion';

interface ChildrenType { children: ReactNode }

export type AccordionTriggerType = ChildrenType & AccordionTriggerProps;
export type AccordionContentType = ChildrenType & AccordionContentProps;

export const AccordionContainer = StyledAccordion;
export const AccordionItem = StyledItem;

export const AccordionTrigger = forwardRef(
  ({ children, ...props }: AccordionTriggerType, forwardedRef: any) => (
    <StyledTrigger {...props} ref={forwardedRef}>
      {children}
      <StyledArrow aria-hidden />
    </StyledTrigger>
  ),
);

export const AccordionContent = forwardRef(
  ({ children, ...props }: AccordionContentType, forwardedRef: any) => (
    <StyledContent {...props} ref={forwardedRef}>
      <StyledContentText>{children}</StyledContentText>
    </StyledContent>
  ),
);
