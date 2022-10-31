import React, { useState } from 'react';
import { Pagination } from 'antd';

import { Direction } from '@components/Direction';
import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import { Section } from '@components/Section';

import { AnnouncementResponse } from '@services/creditbook/lawsuit/hooks/useAnnouncements';

import { LawsuitParams } from '@type/creditbook/Lawsuits';

import LawsuitCard from './Card';
import { LawsuitCardProps } from './types/Props';

interface IProps {
  lawsuitCardProps?: Omit<LawsuitCardProps, 'lawsuit'>,
  // eslint-disable-next-line no-unused-vars
  mutate?: (data: AnnouncementResponse) => void,
  // eslint-disable-next-line no-unused-vars
  mutateIsFiltered?: (data: boolean) => void,
  // eslint-disable-next-line no-unused-vars
  loadMoreAnnouncement: (page?: number) => void
  isFiltered?: boolean,
  isLoading: boolean,
  announcements: AnnouncementResponse,
}

export default function AnnouncementList({
  lawsuitCardProps,
  announcements,
  isLoading,
  loadMoreAnnouncement,
}: IProps) {
  const [page, setPage] = useState(1);

  async function handleChangePage(currentPage: number) {
    setPage(currentPage);
    loadMoreAnnouncement(currentPage);
  }

  if (isLoading) return <span>Loading...</span>;

  if (announcements?.results?.length <= 0 || !announcements?.results) {
    return (
      <Direction style={{ width: '100%', height: '98%' }} alignItems="center" justifyContent="center">
        <Section.Title>Ops, não foi possível encontrar nenhum anúncio</Section.Title>
      </Direction>
    );
  }

  return (
    <>
      <ListLayoutSingleLawsuits>
        {announcements?.results?.map((lawsuit: LawsuitParams) => (
          <LawsuitCard
            key={lawsuit.id}
            lawsuit={lawsuit}
            {...lawsuitCardProps}
          />
        ))}
      </ListLayoutSingleLawsuits>

      <br />

      <Pagination
        total={(announcements.pages ?? 1) * 10}
        defaultCurrent={page}
        onChange={handleChangePage}
      />
    </>
  );
}

AnnouncementList.defaultProps = {
  lawsuitCardProps: null,
  mutate: () => {},
  isFiltered: null,
  mutateIsFiltered: () => {},
};
