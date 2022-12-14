import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import { Button, Link } from '@components/Button';

import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';

import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { batchServices } from '@services/creditbook/batch';

import { Actions, Content } from '../styled';

interface IProps {
  originalBatchId: string,
  originalLawsuit: LawsuitParams
}

export default function BatchActionFooter({ originalLawsuit, originalBatchId }: IProps) {
  const [lawsuit, setLawsuit] = useState(originalLawsuit);
  const [
    lawsuitBelongsBatch,
    setLawsuitBelongsBatch] = useState<boolean>(!!originalLawsuit?.batchId);
  const router = useRouter();

  const handleAddBatch = useCallback(async () => {
    try {
      const response = await batchServices.addAnnouncement({
        announcementId: lawsuit.id,
        batchId: originalBatchId,
      });

      setLawsuit(response.data);
      setLawsuitBelongsBatch(!!response.data.batchId);
    } catch (error) {
      handleCatchErrorRequest(error as never);
    }
  }, []);

  const handleRemoveBatch = useCallback(async () => {
    try {
      const response = await batchServices.removeAnnouncement({
        announcementId: lawsuit.id,
      });

      setLawsuit(response.data);
      setLawsuitBelongsBatch(!!response.data.batchId);
    } catch (error) {
      handleCatchErrorRequest(error as never);
    }
  }, []);

  function handleOnClick() {
    if (!lawsuitBelongsBatch) {
      handleAddBatch();
      router.reload();
      return;
    }

    router.reload();
    handleRemoveBatch();
  }

  return (
    <Actions>
      <Content>
        <Link href={`/in/ads/${originalLawsuit.id}`} size="small-large" variant="secondary">
          Informação
        </Link>

        <Button onClick={() => handleOnClick()} variant={lawsuitBelongsBatch ? 'danger' : 'default'}>
          {!lawsuitBelongsBatch && 'Adicionar'}
          {lawsuitBelongsBatch && 'Remover'}
        </Button>
      </Content>
    </Actions>
  );
}
