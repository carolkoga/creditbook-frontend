/* eslint-disable react/jsx-no-useless-fragment */
import { Direction } from '@components/Direction';
import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import { Section } from '@components/Section';
import { lawsuitService } from '@services/creditbook/lawsuit';
import { Pagination } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import LawsuitCard from './Card';
import { LawsuitCardListProps } from './types/Props';

export interface LawsuitListRefParams {
  // eslint-disable-next-line no-unused-vars
  handleSetLawsuits: (data: any[]) => void,
  // eslint-disable-next-line no-unused-vars
  handleSetPagination: (data: LawsuitCardListProps['pagination']) => void,
  // eslint-disable-next-line no-unused-vars
  handleIsFiltered: (data: boolean) => void,
  isFiltered: boolean,
}

const LawsuitCardList = forwardRef<any, LawsuitCardListProps>(({
  lawsuits: originalLawsuit,
  pagination: originalPagination,
  lawsuitCardProps,
  customQuery,
}, ref) => {
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(originalPagination as LawsuitCardListProps['pagination']);
  const [lawsuits, setLawsuits] = useState(originalLawsuit || []);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    () => ({
      handleSetLawsuits: setLawsuits,
      handleSetPagination: (data: LawsuitCardListProps['pagination']) => setPagination(data),
      handleIsFiltered: setIsFiltered,
      isFiltered,
    }),
    [],
  );

  async function loadAnnouncementsByPage(currentPage: number) {
    try {
      if (pagination?.paginateByAnnouncementsUser) {
        const response = await lawsuitService.listAnnouncementsUser({
          params: {
            page: currentPage,
            perPage: pagination?.perPage || 1,
          },
        });
        setLawsuits(response.data.announcements as any);
        return;
      }

      const response = await lawsuitService.listAll({
        params: {
          page: currentPage,
          perPage: pagination?.perPage || 1,
          ...customQuery,
        },
      });
      setLawsuits(response.data.announcements as any);
    } catch {
      setLawsuits([]);
    }
  }

  function handleChangePage(currentPage: number) {
    setPage(() => currentPage);
    loadAnnouncementsByPage(currentPage);
  }

  if (lawsuits.length <= 0) {
    return (
      <Direction style={{ width: '100%', height: '98%' }} alignItems="center" justifyContent="center">
        <Section.Title>Ops, não foi possível encontrar nenhum anúncio</Section.Title>
      </Direction>
    );
  }

  return (
    <>
      {lawsuits?.length && (
        <>
          <ListLayoutSingleLawsuits ref={ref}>
            {lawsuits.map((lawsuit) => (
              <LawsuitCard
                key={lawsuit.id}
                lawsuit={lawsuit}
                {...lawsuitCardProps}
              />
            ))}
          </ListLayoutSingleLawsuits>

          {pagination && (
            <>
              <br />
              <Pagination
                total={pagination.total * 10}
                defaultCurrent={page}
                onChange={handleChangePage}
              />
            </>
          )}
        </>
      )}
    </>
  );
});

export default LawsuitCardList;
