import {
  useCallback, useEffect, useState,
} from 'react';

import { QueriesToIndexAnnouncements } from '@type/creditbook';

import { lawsuitService } from '..';
import { AnnouncementResponse, CommonHookParams } from './types';

export interface IUseAnnouncementResponse extends CommonHookParams {
  // eslint-disable-next-line no-unused-vars
  loadMoreAnnouncement: (page?: number) => void,
}

export default function useAnnouncements(
  defaultValue?: AnnouncementResponse,
  fetcherOptions?: QueriesToIndexAnnouncements,
): IUseAnnouncementResponse {
  const [currentAnnouncements,
    setCurrentAnnouncements] = useState(defaultValue as AnnouncementResponse);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadAnnouncements = useCallback(async (page?: number) => {
    try {
      setIsLoading(true);

      let response;

      if (fetcherOptions?.getOnlyPremium === true) {
        response = await lawsuitService.getPremium();
      } else {
        response = await lawsuitService.listAll({
          params: {
            ...fetcherOptions?.params,
            page,
          },
        });
      }

      setCurrentAnnouncements({
        pages: response.data.pages,
        results: response.data.announcements,
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
    mutateIsFiltered: (data: boolean) => setIsFiltered(data),
    isFiltered,
    announcements: currentAnnouncements,
    loadMoreAnnouncement: (page?: number) => loadAnnouncements(page),
    error,
  };
}
