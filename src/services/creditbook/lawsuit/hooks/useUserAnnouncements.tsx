import {
  useCallback, useEffect, useState,
} from 'react';
import { ResponseListAllAnnouncements } from '@type/creditbook/Lawsuits';
import { lawsuitService } from '..';

interface AnnouncementResponse {
  results: ResponseListAllAnnouncements['announcements'],
  pages: ResponseListAllAnnouncements['pages']
}

export interface IUseAnnouncementResponse {
  // eslint-disable-next-line no-unused-vars
  mutate: (data: AnnouncementResponse) => void,
  isLoading: boolean,
  announcements: AnnouncementResponse,
  // eslint-disable-next-line no-unused-vars
  loadMoreAnnouncement: () => void
}

export default function useUserAnnouncements(): IUseAnnouncementResponse {
  const [currentAnnouncements,
    setCurrentAnnouncements] = useState({} as AnnouncementResponse);
  const [isLoading, setIsLoading] = useState(false);
  const loadAnnouncements = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await lawsuitService.listAnnouncementsUser();
      setCurrentAnnouncements({
        results: response.data,
        pages: 1,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  return {
    mutate: (data: AnnouncementResponse) => setCurrentAnnouncements(data),
    isLoading,
    announcements: currentAnnouncements,
    loadMoreAnnouncement: () => loadAnnouncements(),
  };
}
