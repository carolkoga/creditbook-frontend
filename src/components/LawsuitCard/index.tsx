/* eslint-disable react/jsx-no-useless-fragment */
import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import { lawsuitService } from '@services/creditbook/lawsuit';
import { Pagination } from 'antd';
import { useState } from 'react';
import LawsuitCard from './Card';
import { LawsuitCardListProps } from './types/Props';

export default function LawsuitCardList({
  lawsuits: originalLawsuit,
  pagination,
  lawsuitCardProps,
}: LawsuitCardListProps) {
  const [page, setPage] = useState(1);
  const [lawsuits, setLawsuits] = useState(originalLawsuit);

  async function loadAnnouncementsFiltered(currentPage: number) {
    try {
      const response = await lawsuitService.listAll({
        params: {
          page: currentPage,
          perPage: pagination?.perPage || 1,
        },
      });
      setLawsuits(response.data.announcements as any);
    } catch {
      setLawsuits([]);
    }
  }

  function handleChangePage(currentPage: number) {
    setPage(() => currentPage);
    loadAnnouncementsFiltered(currentPage);
  }

  return (
    <>
      {lawsuits?.length && (
        <>
          <ListLayoutSingleLawsuits>
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
}

LawsuitCardList.defaultProps = {
  pagination: null,
};
