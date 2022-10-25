import { useRef } from 'react';
import { GetServerSideProps } from 'next';

import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import LawsuitCardList, { LawsuitListRefParams } from '@components/LawsuitCard';
import { PaginationLawsuitProps } from '@components/LawsuitCard/types/Props';

import { Section } from '@components/Section';
import TabBatchAnnouncement from '@components/TabBatchAnnouncement';

import { lawsuitService } from '@services/creditbook/lawsuit';
import { LawsuitParams } from '@type/creditbook/Lawsuits';

interface IProps {
  announcements: {
    result: LawsuitParams[],
    pagination: PaginationLawsuitProps
  }
}

export default function BuyAnnouncements({ announcements }: IProps) {
  const lawsuitListRef = useRef<LawsuitListRefParams>({} as LawsuitListRefParams);
  const { isFiltered } = lawsuitListRef.current;

  function handleProcessAnnouncementsFiltered(lawsuit: ResponseFilterCreditsProps<'announcements'>) {
    lawsuitListRef.current.handleSetLawsuits(lawsuit?.results);
    lawsuitListRef.current.handleSetPagination({
      total: lawsuit?.pages,
    });
    lawsuitListRef.current.handleIsFiltered(true);
  }

  return (
    <TabBatchAnnouncement announcementLink="/in/buy-credits" batchLink="/in/buy-credits/batches">
      <Section.Header>
        <Section.Title as="h1">
          {!isFiltered && 'Comprar anúncios'}
          {isFiltered && 'Anúncios relacionados ao filtro'}
        </Section.Title>
        <FilterDrawer onGetResponseResults={handleProcessAnnouncementsFiltered} />
      </Section.Header>

      <Section.Container>
        <LawsuitCardList
          ref={lawsuitListRef}
          lawsuits={announcements.result}
          pagination={announcements.pagination}
        />
      </Section.Container>
    </TabBatchAnnouncement>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const perPageAnnouncements = 10;
  const { data } = await lawsuitService.listAll({ params: { perPage: perPageAnnouncements } });

  return {
    props: {
      announcements: {
        result: data.announcements,
        pagination: {
          total: data.pages,
          perPage: perPageAnnouncements,
        },
      },
    },
  };
};
