import {
  useCallback, useEffect, useState,
} from 'react';
import { lawsuitService } from '..';
import { AnnouncementResponse, CommonHookParams } from './types';

export interface IUseAnnouncementResponse extends Pick<CommonHookParams, 'mutate' | 'isLoading' | 'announcements' | 'error'>{
  loadMoreAnnouncement: () => void
}

export default function useUserAnnouncements(): IUseAnnouncementResponse {
  const [
    currentAnnouncements,
    setCurrentAnnouncements,
  ] = useState({} as AnnouncementResponse);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadAnnouncements = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await lawsuitService.listAnnouncementsUser();
      setCurrentAnnouncements({
        results: response.data,
        pages: 1,
      });
    } catch {
      setError(true);
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
    error,
    loadMoreAnnouncement: () => loadAnnouncements(),
  };
}
