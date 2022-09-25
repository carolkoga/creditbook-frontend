import { BatchCard } from './Card';

export default function BatchsList({ mine, batchs }: any) {
  return (
    <>
      {batchs.map((batch: { id: string }) => (
        <BatchCard key={batch.id} mine={mine} />
      ))}
    </>
  );
}
