import { QueriesToIndexAnnouncements } from '@type/creditbook';
import type { LawsuitParams } from '@type/creditbook/Lawsuits';

export type LawsuitCardProps = {
  lawsuit: LawsuitParams,
  batchIdForActions?: string,
  moreAboutOnly?: boolean,
};

export interface PaginationLawsuitProps {
  perPage?: number,
  total: number | undefined,
  paginateByAnnouncementsUser?: boolean,
}

export type LawsuitCardListProps = {
  lawsuits: LawsuitParams[] | undefined
  pagination?: PaginationLawsuitProps,
  lawsuitCardProps?: Omit<LawsuitCardProps, 'lawsuit'>,
  customQuery?: QueriesToIndexAnnouncements['params']
};
