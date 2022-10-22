import { useCallback, useState } from 'react';

import { Button } from '@components/Button';

import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';

import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { lawsuitService } from '@services/creditbook/lawsuit';

import { Actions, Content } from '../styled';

interface IProps {
  originalBatchId: string,
  originalLawsuit: LawsuitParams
}

export default function AddToBatch({ originalLawsuit, originalBatchId }: IProps) {
  const [lawsuit, setLawsuit] = useState(originalLawsuit);
  const [lawsuitBelongsBatch, setLawsuitBelongsBatch] = useState<boolean>(false);
  const handleAddBatch = useCallback(async () => {
    try {
      const response = await lawsuitService.changeBatch({
        id: lawsuit.id,
        batchId: originalBatchId as string,
      });
      setLawsuit(response.data);
      setLawsuitBelongsBatch(true);
    } catch (error) {
      handleCatchErrorRequest(error as never);
    }
  }, []);

  return (
    <Actions>
      <Content>
        <Button onClick={() => handleAddBatch()} variant={lawsuitBelongsBatch ? 'white' : 'default'}>
          {!lawsuitBelongsBatch && 'Adicionar'}
          {lawsuitBelongsBatch && 'Adicionado'}
        </Button>
      </Content>
    </Actions>
  );
}
