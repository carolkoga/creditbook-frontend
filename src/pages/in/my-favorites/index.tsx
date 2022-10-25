import { useRef } from 'react';
import { GetServerSideProps } from 'next';

import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import LawsuitCardList, { LawsuitListRefParams } from '@components/LawsuitCard';
import { Section } from '@components/Section';

import { lawsuitService } from '@services/creditbook/lawsuit';
import { CustomResponseAnnouncements } from '@type/creditbook';

interface IProps {
  announcementsFavorites: CustomResponseAnnouncements,
}

export default function MyFavorites({ announcementsFavorites }: IProps) {
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
          {!isFiltered && 'Meus anúncios'}
          {isFiltered && 'Anúncios relacionados ao filtro'}
        </Section.Title>
        <FilterDrawer onGetResponseResults={handleProcessAnnouncementsFiltered} />
      </Section.Header>

      <Section.Container>
        <LawsuitCardList
          ref={lawsuitListRef}
          lawsuits={announcementsFavorites.result}
          pagination={announcementsFavorites.pagination}
        />
      </Section.Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await lawsuitService.listAll({
    params: {
      isFavorite: true,
    },
  });

  return {
    props: {
      announcementsFavorites: {
        result: data.announcements,
        pagination: {
          total: data.pages,
        },
      },
    },
  };
};
