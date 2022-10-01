import styled from 'styled-components';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

export const StyledHeader = styled(AccordionPrimitive.AccordionHeader)`
  all: unset;
  display: flex;
  background: ${({ theme }) => theme.colors.grey[10]};
  padding-right: 24px;

  &[data-state="open"] {
    box-shadow: 0px 0.3px 16px rgba(0, 0, 0, 0.25);
  }

  > button:first-child {
      &[data-state="open"] {
        box-shadow: none;
      };
  }

  @media (max-width: 430px) {
    flex-direction: column;
    padding: 8px 24px;

    > button:first-child {
      padding-left: 0;
      margin-bottom: 12px;
    }
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
  button {
    padding: 6px 16px;
    border-radius: 10px;
  }
`;
