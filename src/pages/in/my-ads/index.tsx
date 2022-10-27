import { useRef } from 'react';
import { GetServerSideProps } from 'next';

import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import LawsuitCardList, { LawsuitListRefParams } from '@components/LawsuitCard';
import { PaginationLawsuitProps } from '@components/LawsuitCard/types/Props';

import { Section } from '@components/Section';

import { LawsuitService } from '@services/creditbook/lawsuit';
import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { setupAPIClient } from '@api/creditbookApi';

interface IProps {
  announcements: {
    result: LawsuitParams[],
    pagination: PaginationLawsuitProps
  }
}

export default function MyAds({ announcements }: IProps) {
  const lawsuitListRef = useRef<LawsuitListRefParams>({} as LawsuitListRefParams);

  function handleProcessAnnouncementsFiltered(lawsuit: ResponseFilterCreditsProps<'announcements'>) {
    lawsuitListRef.current.handleSetLawsuits(lawsuit?.results);
    lawsuitListRef.current.handleIsFiltered(true);
  }

  return (
    <>
      <Section.Header>
        <Section.Title as="h1">
          {!lawsuitListRef?.current?.isFiltered && 'Meus anúncios'}
          {lawsuitListRef?.current?.isFiltered && 'Anúncios relacionados ao filtro'}
        </Section.Title>
        <FilterDrawer onGetResponseResults={handleProcessAnnouncementsFiltered} />
      </Section.Header>

      <Section.Container>
        <LawsuitCardList
          ref={lawsuitListRef}
          lawsuits={announcements.result}
        />
      </Section.Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const api = setupAPIClient(req.cookies['nextauth.token']);
  const lawsuitServicesSSR = new LawsuitService(api);
  const { data } = await lawsuitServicesSSR.listAnnouncementsUser();

  return {
    props: {
      announcements: {
        result: data,
      },
    },
  };
};
