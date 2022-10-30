import {
  useCallback, useEffect, useState,
} from 'react';
import { QueriesToIndexAnnouncements } from '@type/creditbook';
import { ResponseListAllAnnouncements } from '@type/creditbook/Lawsuits';
import { lawsuitService } from '..';

export default function useAnnouncements(fetcherOptions?: QueriesToIndexAnnouncements) {
  const [currentAnnouncements,
    setCurrentAnnouncements] = useState({} as ResponseListAllAnnouncements);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loadAnnouncements = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await lawsuitService.listAll(fetcherOptions);
      setCurrentAnnouncements(response.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  return {
    mutate: (data: ResponseListAllAnnouncements) => setCurrentAnnouncements(data),
    isLoading,
    mutateIsFiltered: (data: boolean) => setIsFiltered(data),
    isFiltered,
    announcements: {
      results: currentAnnouncements?.announcements,
      pages: currentAnnouncements?.pages,
    },
  };
}
