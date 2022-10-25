import { useRef } from 'react';
import { GetServerSideProps } from 'next';

import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import LawsuitCardList, { LawsuitListRefParams } from '@components/LawsuitCard';

import { Section } from '@components/Section';
import { lawsuitService } from '@services/creditbook/lawsuit';
import { CustomResponseAnnouncements } from '@type/creditbook';

interface IProps {
  announcementsPremium: CustomResponseAnnouncements,
}

export default function GalleryPremium({ announcementsPremium }: IProps) {
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
    <>
      <Section.Header>
        <Section.Title as="h1">
          {!isFiltered && 'Galeria Premium'}
          {isFiltered && 'Anúncios relacionados ao filtro'}
        </Section.Title>
        <FilterDrawer onGetResponseResults={handleProcessAnnouncementsFiltered} />
      </Section.Header>

      <Section.Container>
        <LawsuitCardList
          ref={lawsuitListRef}
          lawsuits={announcementsPremium.result}
          pagination={announcementsPremium.pagination}
          customQuery={{ isPremium: true }}
        />
      </Section.Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const { data } = await lawsuitService.listAll({
    params: {
      isPremium: true,
    },
  });

  return {
    props: {
      announcementsPremium: {
        result: data.announcements,
        pagination: {
          total: data.pages,
        },
      },
    },
  };
};
