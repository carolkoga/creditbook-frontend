import LawsuitCardList from '@components/LawsuitCard';
import LawsuitCardSwiper from '@components/LawsuitCard/LawsuitCardSwiper/index';
import { Section } from '@components/Section';

import SelectAdsFilters from '@components/SelectAdsFilters';
import { Direction } from '@components/Direction';

import { Link } from '@components/Button';
import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { GetServerSideProps } from 'next';
import { lawsuitService } from '@services/creditbook/lawsuit';
import { PaginationLawsuitProps } from '@components/LawsuitCard/types/Props';

interface IProps {
  announcements: {
    result: LawsuitParams[],
    pagination: PaginationLawsuitProps
  },
  announcementsPremium: LawsuitParams[],
}

export default function Home({ announcements, announcementsPremium }: IProps) {
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
          <Section.Title as="h3">Anúncios gerais</Section.Title>
          <SelectAdsFilters />
        </Section.Header>

        {(announcements.result.length > 0) && (
          <LawsuitCardList lawsuits={announcements.result} pagination={announcements.pagination} />
        )}

        {(announcements.result.length <= 0) && (
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
