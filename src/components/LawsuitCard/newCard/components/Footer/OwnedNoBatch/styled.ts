import styled from 'styled-components';
import {
  Trigger, RadioGroup, Arrow, RadioItem,
} from '@radix-ui/react-dropdown-menu';

export const DropdownButton = styled(Trigger)`
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.grey[80]};
  width: 80px;
  padding: 3px 30px;
  font-size: 13px;
  background: ${({ theme }) => theme.colors.grey[30]};
  transition: all .35s ease-in;
  font-family: 'Roboto', sans-serif;
`;

export const DropdownMenuRadioGroup = styled(RadioGroup)`
  background: ${({ theme }) => theme.colors.grey[10]};
  width: 100%;
  border-radius: 10px;
  min-width: 150px;
  box-shadow: 0.3px 5px 15px 0.3px rgba(0,0,0,0.35);
`;

export const DropdownMenuRadioItem = styled(RadioItem)`
  padding: 13px;
  font-size: 13px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  transition: all .35s ease-in;

  &[aria-checked="true"] {
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.grey[10]};
    filter: brightness(1.8);
  }

  :hover {
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.grey[10]};
    filter: brightness(1.8);
  }

  :nth-child(1) {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }


  :last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
`;

export const DropdownArrow = styled(Arrow)`
  box-shadow: 0.3px 5px 15px 0.3px rgba(0,0,0,0.35);
  fill: ${({ theme }) => theme.colors.grey[10]};
`;
