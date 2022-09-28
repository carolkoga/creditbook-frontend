import styled from 'styled-components';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

export const StyledHeader = styled(AccordionPrimitive.AccordionHeader)`
  all: unset;
  display: flex;

  padding-right: 24px;

  &[data-state="open"] {
    box-shadow: 0px 0.3px 16px rgba(0, 0, 0, 0.25);
  }

  > button:first-child {
      &[data-state="open"] {
        box-shadow: none;
      };
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  button {
    padding: 6px 16px;
    border-radius: 10px;
  }
`;
