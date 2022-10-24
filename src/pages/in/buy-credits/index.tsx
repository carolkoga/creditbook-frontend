import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';

import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import LawsuitCardList from '@components/LawsuitCard';
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
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<LawsuitParams[]>([]);
  const [totalPagesFilteredAnnouncements, setTotalPagesFilteredAnnouncements] = useState(1);

  function handleGetResponse(lawsuit: ResponseFilterCreditsProps<'announcements'>) {
    if (lawsuit?.results.length <= 0) {
      return toast.info('Ops, Não existe nenhum relacionado a suas preferências');
    }

    setFilteredAnnouncements(lawsuit?.results);
    setTotalPagesFilteredAnnouncements(lawsuit.pages);
  }

  return (
    <TabBatchAnnouncement announcementLink="/in/buy-credits" batchLink="/in/buy-credits/batches">
      <Section.Header>
        <Section.Title as="h1">Comprar anúncios</Section.Title>
        <FilterDrawer onGetResponseResults={handleGetResponse} />
      </Section.Header>

      <Section.Container>
        {filteredAnnouncements?.length > 0 && (
          <LawsuitCardList
            lawsuits={filteredAnnouncements}
            pagination={{ total: totalPagesFilteredAnnouncements }}
          />
        )}

        {(announcements?.result?.length > 0 && !filteredAnnouncements?.length) && (
          <LawsuitCardList lawsuits={announcements.result} pagination={announcements.pagination} />
        )}

        {(announcements?.result?.length <= 0) && (
          <Section.Title as="strong" textColor="dark">Não existe nenhum anuncio ainda</Section.Title>
        )}
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
