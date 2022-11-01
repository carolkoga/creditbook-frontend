import { ListBatches } from '@components/ListBatches';
import NotFoundData, { NotFoundDataProps } from '@components/NotFoundData';
import useAuth from '@hooks/useAuth';
import { BatchParams } from '@type/creditbook/Batch';
import { BatchCard } from './Card';

interface IProps {
  batches: BatchParams[],
  customMine?: boolean | null
  notFoundProps?: NotFoundDataProps
}

export default function BatchesList({ customMine, batches, notFoundProps }: IProps) {
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
        <NotFoundData title="Não existe dados cadastrados" reloadPage {...notFoundProps} />
      )}
    </>
  );
}

BatchesList.defaultProps = {
  customMine: null,
  notFoundProps: null,
};
