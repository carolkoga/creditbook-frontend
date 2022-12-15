import React, { useState } from 'react';
import { Pagination } from 'antd';

import { ListLayoutSingleLawsuits } from '@components/ListsLayout';

import { LawsuitParams } from '@type/creditbook/Lawsuits';

import NotFoundData, { NotFoundDataProps } from '@components/NotFoundData';

import { AnnouncementResponse } from '@services/creditbook/lawsuit/hooks/types';
import useUserBatches from '@services/creditbook/batch/hooks/useUserBatches';

import WrapperLoader from '@components/Loader/WrapperLoader';
import LawsuitCard from './Card';
import { LawsuitCardProps } from './types/Props';

interface IProps {
  lawsuitCardProps?: Omit<LawsuitCardProps, 'lawsuit'>,
  // eslint-disable-next-line no-unused-vars
  mutate?: (data: AnnouncementResponse) => void,
  // eslint-disable-next-line no-unused-vars
  mutateIsFiltered?: (data: boolean) => void,
  // eslint-disable-next-line no-unused-vars
  loadMoreAnnouncement?: (page?: number) => void
  isFiltered?: boolean,
  isLoading: boolean,
  announcements: AnnouncementResponse,
  notFoundProps?: NotFoundDataProps,
  error?: boolean
}

export default function AnnouncementList({
  lawsuitCardProps,
  announcements,
  isLoading,
  loadMoreAnnouncement,
  notFoundProps,
  error,
}: IProps) {
  const [page, setPage] = useState(1);
  const { batches: userBatches } = useUserBatches();

  async function handleChangePage(currentPage: number) {
    setPage(currentPage);
    if (loadMoreAnnouncement) {
      loadMoreAnnouncement(currentPage);
    }
  }

  if (isLoading) return <WrapperLoader />;

  if (announcements?.results?.length <= 0 || !announcements?.results) {
    if (error) {
      return (
        <NotFoundData
          title="Aconteceu algum erro ao pegar os dados"
          type="reload"
        />
      );
    }

    return (
      <NotFoundData title="Não há dados cadastrados" type="reload" {...notFoundProps} />
    );
  }

  return (
    <>
      <ListLayoutSingleLawsuits>
        {announcements?.results?.map((lawsuit: LawsuitParams) => (
          <LawsuitCard
            key={lawsuit.id}
            lawsuit={lawsuit}
            userBatches={userBatches}
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
  loadMoreAnnouncement: () => {},
  notFoundProps: null,
  error: false,
};
