import { ResponseListAllAnnouncements } from '@type/creditbook/Lawsuits';

export interface AnnouncementResponse {
  results: ResponseListAllAnnouncements['announcements'],
  pages: ResponseListAllAnnouncements['pages']
}

interface CommonHookFunction {
  // eslint-disable-next-line no-unused-vars
  mutateIsFiltered: (data: boolean) => void,
  // eslint-disable-next-line no-unused-vars
  mutate: (data: AnnouncementResponse) => void,

}

export interface CommonHookParams extends CommonHookFunction {
  isLoading: boolean,
  isFiltered: boolean,
  error: boolean,
  announcements: AnnouncementResponse,
}
