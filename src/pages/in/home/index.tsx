import LawsuitCardList from '@components/LawsuitCard';
import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper/index';
import { Section } from '@components/Section';

import { Direction } from '@components/Direction';

import { Link } from '@components/Button';
import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { GetServerSideProps } from 'next';
import { lawsuitService } from '@services/creditbook/lawsuit';
import { PaginationLawsuitProps } from '@components/LawsuitCard/types/Props';
import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface IProps {
  announcements: {
    result: LawsuitParams[],
    pagination: PaginationLawsuitProps
  },
  announcementsPremium: LawsuitParams[],
}

export default function Home({ announcements, announcementsPremium }: IProps) {
  // const [loading, setLoading] = useState(false);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<LawsuitParams[]>([]);
  const [totalPagesFilteredAnnouncements, setTotalPagesFilteredAnnouncements] = useState(1);

  function handleProcessAnnouncementsFiltered(lawsuit: ResponseFilterCreditsProps<'announcements'>) {
    if (lawsuit?.results.length <= 0) {
      return toast.info('Ops, Não existe nenhum relacionado a suas preferências');
    }

    setFilteredAnnouncements(lawsuit?.results);
    setTotalPagesFilteredAnnouncements(lawsuit.pages);
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
            {(announcements?.result?.length > 0 && !filteredAnnouncements?.length)
              ? 'Anúncios gerais'
              : 'Anúncios relacionados ao filtro'}
          </Section.Title>
          <FilterDrawer filter="announcements" onGetResponseResults={handleProcessAnnouncementsFiltered} />
        </Section.Header>

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
