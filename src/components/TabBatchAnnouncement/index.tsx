import { Direction } from '@components/Direction';
import NavigationTab from '@components/NavigationTab';
import { ReactNode } from 'react';

interface IProps {
  announcementLink: string,
  batchLink: string,
  children: ReactNode,
}

export default function TabBatchAnnouncement({ children, announcementLink, batchLink }: IProps) {
  return (
    <>
      <Direction>
        <NavigationTab
          routes={[
            {
              label: 'Anúncios',
              link: announcementLink,
            },

            {
              label: 'Lotes',
              link: batchLink,
            },
          ]}
        />
      </Direction>
      {children}
    </>
  );
}
