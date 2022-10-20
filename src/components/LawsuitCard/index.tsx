/* eslint-disable react/jsx-no-useless-fragment */
import LawsuitCard from './Card';
import { LawsuitCardListProps } from './types/Props';

export default function LawsuitCardList({ lawsuits }: LawsuitCardListProps) {
  return (
    <>
      {lawsuits?.map((lawsuit) => (
        <LawsuitCard
          key={lawsuit.id}
          lawsuit={lawsuit}
        />
      ))}
    </>
  );
}
