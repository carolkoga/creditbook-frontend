import LawsuitCard from './newCard';
import { LawsuitCardListProps } from './types/Props';

export default function LawsuitCardList({ lawsuits }: LawsuitCardListProps) {
  return (
    <>
      {lawsuits.map((lawsuit) => (
        <LawsuitCard
          key={lawsuit.id}
          lawsuit={lawsuit}
        />
      ))}
    </>
  );
}
