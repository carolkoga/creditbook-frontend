import { Direction } from '@components/Direction';
import { ListBatches } from '@components/ListBatches';
import { Section } from '@components/Section';
import useAuth from '@hooks/useAuth';
import { BatchParams } from '@type/creditbook/Batch';
import { BatchCard } from './Card';

interface IProps {
  batches: BatchParams[],
  customMine?: boolean | null
}

export default function BatchesList({ customMine, batches }: IProps) {
  const { user } = useAuth();

  return (
    <>
      {batches?.length > 0 && (
        <ListBatches>
          {batches.map((currentBatch) => (
            <BatchCard
              key={currentBatch.id}
              batch={currentBatch}
              mine={customMine ?? user?.id === currentBatch.userId}
            />
          ))}
        </ListBatches>
      )}

      {batches?.length <= 0 && (
        <Direction alignItems="center" justifyContent="center">
          <Section.Title as="strong" textColor="dark">Ops, não foi possível encontrar nenhum lote</Section.Title>
        </Direction>
      )}
    </>
  );
}

BatchesList.defaultProps = {
  customMine: null,
};
