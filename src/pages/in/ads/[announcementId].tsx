import React from 'react';
import { GetServerSideProps } from 'next';

import { setupAPIClient } from '@api/creditbookApi';
import LawsuitView from '@components/LawsuitView';
import { LawsuitService } from '@services/creditbook/lawsuit';
import { LawsuitParams } from '@type/creditbook/Lawsuits';

interface IProps {
  announcement: LawsuitParams,
}

export default function AnnouncementId({ announcement }: IProps) {
  return (
    <LawsuitView announcement={announcement} />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const api = setupAPIClient(req.cookies['nextauth.token']);
  const announcementServices = new LawsuitService(api);
  const { data } = await announcementServices.getById(query.announcementId as string);
  return {
    props: {
      announcement: data,
    },
  };
};
