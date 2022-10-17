import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Link } from '@components/Button';
import {
  DropdownArrow,
  DropdownButton,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from './styled';
import { Actions, Content } from '../styled';
import { CommonPropsTypes } from '..';

export default function OwnedNoBatch({ lawsuitId }: CommonPropsTypes) {
  const [value, setValue] = useState('1');
  return (
    <Actions>
      <Content>
        <Link href={`/in/ads/${lawsuitId}`} size="small-large" variant="secondary">
          Informação
        </Link>
        <DropdownMenu.Root>
          <DropdownButton>
            Adicionar Lote
          </DropdownButton>
          <DropdownMenu.Portal>
            <DropdownMenu.Content>
              <DropdownArrow />
              <DropdownMenuRadioGroup value={value} onValueChange={setValue}>

                <DropdownMenuRadioItem value="1">
                  Item 1
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem value="2">
                  Item 2
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem value="3">
                  Item 3
                </DropdownMenuRadioItem>

              </DropdownMenuRadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </Content>
    </Actions>
  );
}
