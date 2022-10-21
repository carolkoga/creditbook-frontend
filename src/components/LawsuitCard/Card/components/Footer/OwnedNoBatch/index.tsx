import { useCallback, useEffect, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Link } from '@components/Button';

import { batchServices } from '@services/creditbook/batch';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';

import { BatchParams } from '@type/creditbook/Batch';

import { lawsuitService } from '@services/creditbook/lawsuit';
import {
  DropdownArrow,
  DropdownButton,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from './styled';
import { Actions, Content } from '../styled';
import { CommonPropsTypes } from '..';

export default function OwnedNoBatch({ lawsuitId }: CommonPropsTypes) {
  const [batches, setBatches] = useState(null || []);
  const [value, setValue] = useState('1');

  const loadBatches = useCallback(async () => {
    try {
      const response = await batchServices.list();
      setBatches(response.data);
    } catch (error) {
      handleCatchErrorRequest(error as never);
      setBatches(null as any);
    }
  }, []);

  const handleAddBatch = useCallback(async (batchId: string) => {
    try {
      const response = await lawsuitService.changeBatch({
        id: lawsuitId,
        batchId,
      });
      setValue(response.data.id);
    } catch (error) {
      handleCatchErrorRequest(error as never);
      setBatches(null as any);
    }
  }, []);

  useEffect(() => {
    loadBatches();
  }, [loadBatches]);
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
              <DropdownMenuRadioGroup value={value} onValueChange={handleAddBatch}>
                {batches?.map((batch: BatchParams) => (
                  <DropdownMenuRadioItem key={batch.id} value={batch.id}>
                    {batch.name}
                  </DropdownMenuRadioItem>
                ))}

                {!batches && (
                  <DropdownMenuRadioItem value="0">
                    Aconteceu algum erro
                    <br />
                    recarrega a pagina
                  </DropdownMenuRadioItem>
                )}

                {batches?.length === 0 && (
                  <DropdownMenuRadioItem value="0">
                    Não existe nenhum lote
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
