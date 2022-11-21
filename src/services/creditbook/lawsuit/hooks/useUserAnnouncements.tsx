import {
  useCallback, useEffect, useState,
} from 'react';
import { lawsuitService, OptionsListAnnouncementsUser } from '..';
import { AnnouncementResponse, CommonHookParams } from './types';

export interface IUseAnnouncementResponse extends Pick<CommonHookParams, 'mutate' | 'isLoading' | 'announcements' | 'error'> {
  loadMoreAnnouncement: () => void
}

export default function useUserAnnouncements(
  options?: OptionsListAnnouncementsUser,
): IUseAnnouncementResponse {
  const [
    currentAnnouncements,
    setCurrentAnnouncements,
  ] = useState({} as AnnouncementResponse);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadAnnouncements = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await lawsuitService.listAnnouncementsUser(options);
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
