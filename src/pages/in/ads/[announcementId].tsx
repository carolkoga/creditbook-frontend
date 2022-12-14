import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import LawsuitView from '@components/LawsuitView';
import { lawsuitService } from '@services/creditbook/lawsuit';
import { LawsuitParams } from '@type/creditbook/Lawsuits';
import { Section } from '@components/Section';
import { Direction } from '@components/Direction';
import useAuth from '@hooks/useAuth';
import { Button, Link } from '@components/Button';
import NotFoundData from '@components/NotFoundData';
import WrapperLoader from '@components/Loader/WrapperLoader';

export default function AnnouncementId() {
  const { user } = useAuth();
  const router = useRouter();
  const [announcement, setAnnouncement] = useState<LawsuitParams | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadAnnouncementInformation = useCallback(async () => {
    try {
      const announcementId = router.query.announcementId as string;
      const response = await lawsuitService.getById(announcementId);
      setAnnouncement(response.data);
    } finally {
      setIsLoading(false);
    }
  }, [router.query, router.pathname]);

  useEffect(() => {
    loadAnnouncementInformation();
  }, [loadAnnouncementInformation]);

  if (isLoading) {
    return (
      <WrapperLoader />
    );
  }

  if (!announcement) {
    return (
      <NotFoundData title="Não foi possível encontrar nenhum anúncio" href="/in/home" type="link" labelButton="Voltar para Home" />
    );
  }

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
              : `/in/contact-announcer/${announcement.id}?type=${announcement?.batchId ? 'batch' : 'announcement'}`}
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
