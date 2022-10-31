import {
  useCallback, useEffect, useState,
} from 'react';
import { QueriesToIndexAnnouncements } from '@type/creditbook';
import { ResponseListAllAnnouncements } from '@type/creditbook/Lawsuits';
import { lawsuitService } from '..';

export interface AnnouncementResponse {
  results: ResponseListAllAnnouncements['announcements'],
  pages: ResponseListAllAnnouncements['pages']
}

export interface IUseAnnouncementResponse {
  // eslint-disable-next-line no-unused-vars
  mutate: (data: AnnouncementResponse) => void,
  isLoading: boolean,
  // eslint-disable-next-line no-unused-vars
  mutateIsFiltered: (data: boolean) => void,
  isFiltered: boolean,
  announcements: AnnouncementResponse,
  // eslint-disable-next-line no-unused-vars
  loadMoreAnnouncement: (page?: number) => void
}

export default function useAnnouncements(
  fetcherOptions?: QueriesToIndexAnnouncements,
): IUseAnnouncementResponse {
  const [currentAnnouncements,
    setCurrentAnnouncements] = useState({} as AnnouncementResponse);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loadAnnouncements = useCallback(async (page?: number) => {
    try {
      setIsLoading(true);
      const response = await lawsuitService.listAll({
        params: {
          ...fetcherOptions?.params,
          page,
        },
      });
      setCurrentAnnouncements({
        pages: response.data.pages,
        results: response.data.announcements,
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
    mutateIsFiltered: (data: boolean) => setIsFiltered(data),
    isFiltered,
    announcements: currentAnnouncements,
    loadMoreAnnouncement: (page?: number) => loadAnnouncements(page),
  };
}
