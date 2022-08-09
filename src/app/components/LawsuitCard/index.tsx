import LawsuitCard from './Card';
import { LawsuitCardListProps } from './types/Props';

export default function LawsuitCardList({ lawsuits, access }: LawsuitCardListProps) {
  return (
    <>
      {lawsuits.map((lawsuit) => (
        <LawsuitCard
          key={lawsuit.id}
          access={access}
          lawsuit={lawsuit}
          onToggleFavorite={() => {}}
        />
      ))}
    </>
  );
}
