import { useCallback, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Link } from '@components/Button';

import { batchServices } from '@services/creditbook/batch';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';

import { BatchParams } from '@type/creditbook/Batch';

import {
  DropdownArrow,
  // DropdownButton,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from './styled';
import { Actions, Content } from '../styled';
import { CommonPropsTypes } from '..';

interface OwnedNoBatchParams extends CommonPropsTypes {
  userBatches: BatchParams[]
}

export default function OwnedNoBatch({ lawsuitId, userBatches }: OwnedNoBatchParams) {
  const [errorWithBatch, setErrorWithBatch] = useState(false);
  const [value, setValue] = useState('1');
  // const [hasBatch, setHasBatch] = useState<boolean>(false);

  const handleAddBatch = useCallback(async (batchId: string) => {
    try {
      await batchServices.addAnnouncement({
        announcementId: lawsuitId,
        batchId,
      });

      setValue(batchId);
      // setHasBatch(true);
    } catch (error) {
      handleCatchErrorRequest(error as never);
      setErrorWithBatch(true);
    }
  }, []);

  return (
    <Actions>
      <Content>
        <Link href={`/in/ads/${lawsuitId}`} size="small-large" variant="secondary">
          Informações
        </Link>
        <DropdownMenu.Root>
          {/* <DropdownButton>
            {!hasBatch && 'Lotear'}
            {hasBatch && 'Adicionado'}
          </DropdownButton> */}
          <DropdownMenu.Portal>
            <DropdownMenu.Content>
              <DropdownArrow />
              <DropdownMenuRadioGroup value={value} onValueChange={handleAddBatch}>
                {!errorWithBatch && userBatches?.map((batch: BatchParams) => (
                  <DropdownMenuRadioItem key={batch.id} value={batch.id}>
                    {batch.name}
                  </DropdownMenuRadioItem>
                ))}

                {errorWithBatch && (
                  <DropdownMenuRadioItem value="0" disabled>
                    Aconteceu algum erro
                    <br />
                    recarrega a pagina
                  </DropdownMenuRadioItem>
                )}

                {!errorWithBatch && userBatches?.length <= 0 && (
                  <DropdownMenuRadioItem value="0" disabled>
                    Não há nenhum lote
                  </DropdownMenuRadioItem>
                )}
              </DropdownMenuRadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </Content>
    </Actions>
  );
}
