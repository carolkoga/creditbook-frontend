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
import AlertModal from '@components/AlertModal';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { toast } from 'react-toastify';

export default function AnnouncementId() {
  const { user } = useAuth();
  const router = useRouter();
  const [announcement, setAnnouncement] = useState<LawsuitParams | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deleteModalIsVisible, setDeleteModalIsVisible] = useState(false);

  const loadAnnouncementInformation = useCallback(async () => {
    try {
      const announcementId = router.query.announcementId as string;
      const response = await lawsuitService.getById(announcementId);
      setAnnouncement(response.data);
    } finally {
      setIsLoading(false);
    }
  }, [router.query, router.pathname]);

  function handleOpenDeleteModal() {
    setDeleteModalIsVisible(true);
  }

  function handleCloseDeleteModal() {
    setDeleteModalIsVisible(false);
  }

  async function handleDeleteAnnouncement() {
    try {
      await lawsuitService.deleteAnnouncement(announcement!.id);
      toast.success('Anúncio deletado com sucesso');
      router.push('/in/home');
    } catch (error) {
      handleCatchErrorRequest(error as never);
    }
  }

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
        <Section.Title>Resumo do Anúncio</Section.Title>
      </Section.Header>
      <Section.Container as="main">
        <Direction alignItems="center" justifyContent="center">
          <LawsuitView announcement={announcement} />
        </Direction>
      </Section.Container>

      <Section.Container as="footer">
        <Direction direction="horizontal">
          {(user?.id === announcement.userId && (announcement.status !== 'pending' || announcement.plan === 'batch')) && (
            <Direction direction="horizontal">
              <Link legacyBehavior size="large" href={`/in/ads/edit/${announcement.id}`}>
                Editar
              </Link>

              <Button size="large" variant="danger" onClick={handleOpenDeleteModal}>
                Deletar
              </Button>

              {announcement.status === 'accepted' && (
                <Link
                  legacyBehavior
                  size="large"
                  variant="secondary"
                  replace
                  href={!announcement.batchId
                    ? `/in/sale/declare?processId=${announcement.id}`
                    : `/in/sale/declare?processId=${announcement.batchId}`}
                >
                  Comunicar  Venda
                </Link>
              )}
            </Direction>
          )}

          {((announcement.status !== 'pending' || announcement.plan === 'batch') && user?.id !== announcement.userId && announcement.acceptNegotiation === true) && (
            <Link
              legacyBehavior
              size="large"
              href={!announcement.batchId
                ? `/in/contact-announcer/${announcement.id}`
                : `/in/contact-announcer/${announcement.batchId}?type=batch`}
            >
              Negociar
            </Link>

          )}

          {((announcement.status !== 'pending' || announcement.plan === 'batch') && user?.id !== announcement.userId) && (
            <Link
              legacyBehavior
              size="large"
              href={!announcement.batchId
                ? `/in/contact-announcer/${announcement.id}`
                : `/in/contact-announcer/${announcement.batchId}?type=batch`}
            >
              Comprar
            </Link>

          )}
        </Direction>
      </Section.Container>

      <AlertModal
        isVisible={deleteModalIsVisible}
        type="danger"
        title="Esse anúncio está preste a ser deletado, tem certeza disso?"
        description="Caso você delete o anúncio sem querer, contacta o suporte quanto antes para refazer essa ação!"
        confirm={{
          label: 'Sim, deletar',
          onConfirmButton: handleDeleteAnnouncement,
        }}
        cancel={{
          label: 'Cancelar',
          onCancelButton: handleCloseDeleteModal,
        }}
      />
    </Section.Container>
  );
}
