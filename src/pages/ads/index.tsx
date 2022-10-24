import { GetServerSideProps } from 'next';

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

export default function SingleLawsuits({ announcements }: IProps) {
  return (
    <TabBatchAnnouncement batchLink="/batches" announcementLink="/ads">
      <Section.Header>
        <Section.Title as="h1">Anúncios</Section.Title>
      </Section.Header>

      <Section.Container>
        {(announcements?.result?.length) && (
          <LawsuitCardList lawsuits={announcements.result} pagination={announcements.pagination} />
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
