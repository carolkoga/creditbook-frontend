/* eslint-disable react/jsx-no-useless-fragment */
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

  if (batches?.length <= 0) {
    return (
      <NotFoundData title="Não há dados cadastrados" type="reload" {...notFoundProps} />
    );
  }

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
    </>
  );
}

BatchesList.defaultProps = {
  customMine: null,
  notFoundProps: null,
};
