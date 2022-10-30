import useSWR from 'swr';
import { QueriesToIndexAnnouncements } from '@type/creditbook';
import { lawsuitService } from '..';

export default function useAnnouncements(key: string, options?: QueriesToIndexAnnouncements) {
  const { data, error } = useSWR(
    key,
    async () => (
      await lawsuitService.listAll(options)
    ).data,
    {
      revalidateIfStale: true,
    },
  );

  return {
    isLoading: !data && !error,
    announcements: {
      results: data?.announcements,
      pages: data?.pages,
    },
  };
}
