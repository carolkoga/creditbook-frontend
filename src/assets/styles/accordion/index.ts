import styled from 'styled-components';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { CaretDown } from 'phosphor-react';

export const StyledAccordion = styled(AccordionPrimitive.Root)`
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.grey[10]};
  border: 1px solid ${({ theme }) => theme.colors.grey[30]};
`;

export const StyledItem = styled(AccordionPrimitive.Item)`
  overflow: 'hidden';
  margin-top: 1;
  transition: all .24s ease;
  border: 1px solid ${({ theme }) => theme.colors.grey[10]};
  transition: all .85s ease-in;

  transition: all .4s ease-in;
  &:first-child {
    margin-top: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  };

  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  };

  &:focus-within {
    position: relative;
    z-index: 1;
  };

  & + & {
    border-top: 1px solid #ddd;
  }
`;

export const StyledTrigger = styled(AccordionPrimitive.Trigger)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 45px;

  border: none;
  padding: 0 24px;

  font-family: inherit;
  font-size: 16px;
  font-weight: 400;

  color: ${({ theme }) => theme.colors.primary.main};
  background: ${({ theme }) => theme.colors.grey[10]};
  &::first-letter {
    text-transform: uppercase;
  }

  transition: all .5s ease-in-out;
  cursor: pointer;

  &[data-state="open"] {
    transition: all .35s ease;
    box-shadow: 0px 0.3px 16px rgba(0, 0, 0, 0.25);

    svg {
      transform: rotateX(180deg);
    }
  };

  @media (max-width: 248px) {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const StyledArrow = styled(CaretDown)`
  color: ${({ theme }) => theme.colors.primary.main};
`;

export const StyledContent = styled(AccordionPrimitive.Content)`
  background: #f3f3f3;
  padding-bottom: 12px;
  padding: 32px 24px;
`;

export const StyledContentText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.grey[50]};
  font-weight: 400;
  &::first-letter {
    text-transform: uppercase;
  }
`;
