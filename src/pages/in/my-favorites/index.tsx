import { useRef } from 'react';

import { FilterDrawer, ResponseFilterCreditsProps } from '@components/FilterDrawer';
import LawsuitCardList, { LawsuitListRefParams } from '@components/LawsuitCard';
import { Section } from '@components/Section';

import useUserAnnouncements from '@services/creditbook/lawsuit/hooks/useUserAnnouncements';

export default function MyFavorites() {
  const { announcements, isLoading } = useUserAnnouncements('my_announcements_favorites');
  const lawsuitListRef = useRef<LawsuitListRefParams>({} as LawsuitListRefParams);

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
          {!lawsuitListRef?.current?.isFiltered && 'Meus favoritos'}
          {lawsuitListRef?.current?.isFiltered && 'Anúncios relacionados ao filtro'}
        </Section.Title>
        <FilterDrawer onGetResponseResults={handleProcessAnnouncementsFiltered} />
      </Section.Header>

      <Section.Container>
        {!isLoading && (
          <LawsuitCardList
            ref={lawsuitListRef}
            lawsuits={announcements?.results as never}
          />
        )}
      </Section.Container>
    </>
  );
}
