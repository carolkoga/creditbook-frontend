import { LawsuitParams } from '@type/creditbook/Lawsuits';
import useSWR from 'swr';
import { lawsuitService } from '..';

interface ResponseAnnouncements {
  isLoading: boolean,
  announcements: {
    results: LawsuitParams[] | never | any,
  }
}

export default function useUserAnnouncements(key: string): ResponseAnnouncements {
  const { data, error } = useSWR(
    key,
    async () => (
      await lawsuitService.listAnnouncementsUser()
    ).data,
  );

  return {
    isLoading: !data && !error,
    announcements: {
      results: data,
    },
  };
}
