/* eslint-disable react/jsx-no-useless-fragment */
import { Direction } from '@components/Direction';
import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import { Section } from '@components/Section';
import { lawsuitService } from '@services/creditbook/lawsuit';
import useAnnouncements from '@services/creditbook/lawsuit/hooks/useAnnouncements';
import { QueriesToIndexAnnouncements } from '@type/creditbook';
import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { Pagination } from 'antd';
import React, { useState } from 'react';
import LawsuitCard from './Card';
import { LawsuitCardProps } from './types/Props';

interface IProps {
  fetcherOptions?: QueriesToIndexAnnouncements,
  lawsuitCardProps?: Omit<LawsuitCardProps, 'lawsuit'>
}

export default function AnnouncementList({ fetcherOptions, lawsuitCardProps }: IProps) {
  const [page, setPage] = useState(1);
  const { announcements, isLoading, mutate } = useAnnouncements({
    params: {
      page,
      ...fetcherOptions?.params,
    },
  });

  async function handleChangePage(currentPage: number) {
    setPage(currentPage);
    const { data } = await lawsuitService.listAll({
      params: {
        ...fetcherOptions?.params,
        page: currentPage,
      },
    });

    mutate(data);
  }

  if (announcements.results?.length <= 0) {
    return (
      <Direction style={{ width: '100%', height: '98%' }} alignItems="center" justifyContent="center">
        <Section.Title>Ops, não foi possível encontrar nenhum anúncio</Section.Title>
      </Direction>
    );
  }

  if (isLoading) return <span>Loading...</span>;

  return (
    <>
      <ListLayoutSingleLawsuits>
        {announcements.results?.map((lawsuit: LawsuitParams) => (
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
  fetcherOptions: null,
  lawsuitCardProps: null,
};
