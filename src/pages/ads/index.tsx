import { GetServerSideProps } from 'next';

import AnnouncementList from '@components/LawsuitCard';

import { Section } from '@components/Section';
import TabBatchAnnouncement from '@components/TabBatchAnnouncement';
import { lawsuitService } from '@services/creditbook/lawsuit';
import { ResponseListAllAnnouncements } from '@type/creditbook/Lawsuits';
import useAnnouncements from '@services/creditbook/lawsuit/hooks/useAnnouncements';

interface IProps {
  announcements: {
    results: ResponseListAllAnnouncements['announcements'],
    pages: ResponseListAllAnnouncements['pages']
  }
}

export default function SingleLawsuits({ announcements }: IProps) {
  const response = useAnnouncements(announcements);
  return (
    <TabBatchAnnouncement batchLink="/batches" announcementLink="/ads">
      <Section.Header>
        <Section.Title as="h1">Anúncios</Section.Title>
      </Section.Header>

      <Section.Container>
        <AnnouncementList {...response} />
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
        results: data.announcements,
        pages: data.pages,
      },
    },
  };
};
