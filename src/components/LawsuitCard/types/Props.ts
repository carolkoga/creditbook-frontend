import type { LawsuitParams } from '@type/creditbook/Lawsuits';

export type LawsuitCardProps = {
  lawsuit: LawsuitParams,
  addToBatchId?: string,
  moreAboutOnly?: boolean,
};

export interface PaginationLawsuitProps {
  perPage?: number,
  total: number,
}

export type LawsuitCardListProps = {
  lawsuits: LawsuitParams[] | null
  pagination?: PaginationLawsuitProps,
  lawsuitCardProps?: Omit<LawsuitCardProps, 'lawsuit'>
}
