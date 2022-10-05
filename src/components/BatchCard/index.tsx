import { BatchParams } from '@type/creditbook/Batch';
import { BatchCard } from './Card';

interface IProps {
  batches: BatchParams[],
  mine: boolean
}

export default function BatchsList({ mine, batches }: IProps) {
  return (
    <>
      {batches.map((currentBatch) => (
        <BatchCard key={currentBatch.id} batch={currentBatch} mine={mine} />
      ))}
    </>
  );
}
