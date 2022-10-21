import LawsuitCardList from '@components/LawsuitCard';
import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper/index';
import { ListLayoutSingleLawsuits } from '@components/ListsLayout';
import { Section } from '@components/Section';

import SelectAdsFilters from '@components/SelectAdsFilters';
import { Direction } from '@components/Direction';

import { Link } from '@components/Button';
import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { GetServerSideProps } from 'next';
import { lawsuitService } from '@services/creditbook/lawsuit';
import { Pagination } from 'antd';
import { useMemo, useState } from 'react';

interface IProps {
  announcements: LawsuitParams[],
  totalPages: number,
  announcementsPremium: LawsuitParams[],
}

export default function Home({ announcements, totalPages, announcementsPremium }: IProps) {
  const [page, setPage] = useState(1);
  const announcementsFilteredByPage = useMemo(() => {
    (async () => {
      try {
        const response = await lawsuitService.listAll({
          params: {
            page,
          },
        });
        return response.data.announcements;
      } catch {
        return null;
      }
    })();
  }, [page]) as unknown as LawsuitParams[] | null;

  function handleChangePage(currentPage: number) {
    setPage(() => currentPage);
  }

  return (
    <>
      {announcementsPremium?.length > 0 && (
        <Section.Container bg="light">
          <Direction direction="horizontal" alignItems="center">
            <Section.Title as="h3">Galeria Premium</Section.Title>
            <Link href="/in/gallery-premium" variant="dark">
              Ver Todos
            </Link>
          </Direction>
          <LawsuitCardSwiper lawsuits={announcementsPremium} />
        </Section.Container>
      )}

      <Section.Container>
        <Section.Header>
          <Section.Title as="h3">Anúncios gerais</Section.Title>
          <SelectAdsFilters />
        </Section.Header>

        <ListLayoutSingleLawsuits>
          {announcementsFilteredByPage && (
            <LawsuitCardList lawsuits={announcementsFilteredByPage} />
          )}

          {!announcementsFilteredByPage && (
            <LawsuitCardList lawsuits={announcements} />
          )}
        </ListLayoutSingleLawsuits>
        <Pagination defaultCurrent={1} total={totalPages} onChange={handleChangePage} />
      </Section.Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await lawsuitService.listAll();
  const { data: filterAsPremium } = await lawsuitService.listAll({
    params: {
      isPremium: true,
    },
  });

  return {
    props: {
      announcements: data.announcements,
      totalPages: data.pages,
      announcementsPremium: filterAsPremium.announcements,
    },
  };
};
