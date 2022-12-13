import { GetServerSideProps } from 'next';

import AnnouncementList from '@components/LawsuitCard';

import { Section } from '@components/Section';
import TabBatchAnnouncement from '@components/TabBatchAnnouncement';
import { lawsuitService } from '@services/creditbook/lawsuit';
import { ResponseListAllAnnouncements } from '@type/creditbook/Lawsuits';

interface IProps {
  response: {
    announcements: {
      results: ResponseListAllAnnouncements['announcements'],
      pages: ResponseListAllAnnouncements['pages']
    },
    isLoading: boolean
  }
}

export default function SingleLawsuits({ response }: IProps) {
  return (
    <TabBatchAnnouncement batchLink="/batches" announcementLink="/ads">
      <Section.Header>
        <Section.Title as="h1">Anúncios Individuais</Section.Title>
      </Section.Header>

      <Section.Container>
        <AnnouncementList {...response} />
      </Section.Container>
    </TabBatchAnnouncement>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const announcementsFetched: any = {
    announcements: {
      results: [], pages: 0,
    },
    isLoading: false,
  };

  try {
    const response = await lawsuitService.listAll();
    Object.assign(announcementsFetched, {
      announcements: {
        results: response.data.announcements,
        pages: response.data.pages,
      },
    });
  } catch {
    console.error('Happened an error');
  }

  return {
    props: {
      response: {
        ...announcementsFetched,
        isLoading: false,
      },
    },
  };
};
