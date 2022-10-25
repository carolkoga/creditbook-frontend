import { useRef } from 'react';
import { GetServerSideProps } from 'next';

import LawsuitCardList, { LawsuitListRefParams } from '@components/LawsuitCard';
import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper/index';
import { Section } from '@components/Section';

import { Direction } from '@components/Direction';
import { PaginationLawsuitProps } from '@components/LawsuitCard/types/Props';
import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import { Link } from '@components/Button';

import { lawsuitService } from '@services/creditbook/lawsuit';
import { LawsuitParams } from '@type/creditbook/Lawsuits';

interface IProps {
  announcements: {
    result: LawsuitParams[],
    pagination: PaginationLawsuitProps
  },
  announcementsPremium: LawsuitParams[],
}

export default function Home({ announcements, announcementsPremium }: IProps) {
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
      {announcementsPremium?.length > 0 && (
        <Section.Container bg="light">
          <Section.Header>
            <Direction direction="horizontal" alignItems="center">
              <Section.Title as="h3">Galeria Premium</Section.Title>
              <Link href="/in/gallery-premium" variant="dark">
                Ver Todos
              </Link>
            </Direction>
          </Section.Header>
          <LawsuitCardSwiper lawsuits={announcementsPremium} />
        </Section.Container>
      )}

      <Section.Container>
        <Section.Header>
          <Section.Title as="h3">
            {!isFiltered && 'Anúncios Gerais'}
            {isFiltered && 'Anúncios relacionados ao filtro'}
          </Section.Title>
          <FilterDrawer onGetResponseResults={handleProcessAnnouncementsFiltered} />
        </Section.Header>

        <LawsuitCardList
          ref={lawsuitListRef}
          lawsuits={announcements.result}
          pagination={announcements.pagination}
        />
      </Section.Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const perPageAnnouncements = 10;
  const { data } = await lawsuitService.listAll({ params: { perPage: perPageAnnouncements } });
  const { data: filterAsPremium } = await lawsuitService.listAll({
    params: {
      isPremium: true,
    },
  });

  return {
    props: {
      announcements: {
        result: data.announcements,
        pagination: {
          total: data.pages,
          perPage: perPageAnnouncements,
        },
      },
      announcementsPremium: filterAsPremium.announcements,
    },
  };
};
