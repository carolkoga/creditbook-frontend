import type { LawsuitParams } from '@type/creditbook/Lawsuits';

export type LawsuitCardProps = {
  lawsuit: LawsuitParams
};

export type LawsuitCardListProps = {
  lawsuits: LawsuitParams[] | null
};
