import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import LawsuitCardList from '@components/LawsuitCard';

import { Section } from '@components/Section';
import { lawsuitService } from '@services/creditbook/lawsuit';
import { CustomResponseAnnouncements } from '@type/creditbook';
import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface IProps {
  announcementsFavorites: CustomResponseAnnouncements,
}

export default function MyFavorites({ announcementsFavorites }: IProps) {
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
      <Section.Header>
        <Section.Title as="h3">
          {(announcementsFavorites?.result?.length > 0 && !filteredAnnouncements?.length)
            ? 'Meus favoritos'
            : 'Anúncios relacionados ao filtro'}
        </Section.Title>
        <FilterDrawer
          onGetResponseResults={handleProcessAnnouncementsFiltered}
          customQuery={{ isFavorite: true }}
        />
      </Section.Header>

      <Section.Container>
        {filteredAnnouncements?.length > 0 && (
          <LawsuitCardList
            lawsuits={filteredAnnouncements}
            pagination={{ total: totalPagesFilteredAnnouncements }}
          />
        )}

        {(announcementsFavorites?.result?.length > 0 && !filteredAnnouncements?.length) && (
          <LawsuitCardList
            lawsuits={announcementsFavorites.result}
            pagination={announcementsFavorites.pagination}
          />
        )}

        {(announcementsFavorites?.result?.length <= 0) && (
          <Section.Title as="strong" textColor="dark">Não existe nenhum anuncio ainda</Section.Title>
        )}
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
