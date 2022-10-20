import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { setupAPIClient } from '@api/creditbookApi';
import LawsuitView from '@components/LawsuitView';
import { LawsuitService } from '@services/creditbook/lawsuit';
import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { Section } from '@components/Section';
import { Direction } from '@components/Direction';
import useAuth from '@hooks/useAuth';
import { Button, Link } from '@components/Button';

interface IProps {
  announcement: LawsuitParams,
}

export default function AnnouncementId({ announcement }: IProps) {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <Section.Container>
      <Section.Header>
        <Button variant="white" size="small-large" onClick={() => router.back()}>
          Voltar
        </Button>
        <Section.Title>Sobre o Anúncio</Section.Title>
      </Section.Header>
      <Section.Container as="main">
        <Direction alignItems="center" justifyContent="center">
          <LawsuitView announcement={announcement} />
        </Direction>
      </Section.Container>

      <Section.Container as="footer">
        <Direction>
          <Link
            size="large"
            href={user?.id === announcement.userId
              ? `/in/ads/edit/${announcement.id}`
              : `/in/contact-announcer/ads/${announcement.id}`}
          >
            {user?.id === announcement.userId
              ? 'Editar'
              : 'Falar Com anunciante'}
          </Link>
        </Direction>
      </Section.Container>
    </Section.Container>
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
