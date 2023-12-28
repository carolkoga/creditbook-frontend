import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Button as ButtonAntd, Modal } from 'antd';

import { setupAPIClient } from '@api/creditbookApi';
import LawsuitView from '@components/LawsuitView';
import { LawsuitService } from '@services/creditbook/lawsuit';

import { LawsuitParams } from '@type/creditbook/Lawsuits';

import { Section } from '@components/Section';
import { Direction } from '@components/Direction';
import { Button } from '@components/Button';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { adminServices } from '@services/creditbook/admin';
import { Textarea } from '@components/Input';
import AlertModal from '@components/AdminFormModal/AlertModal';
import { toast } from 'react-toastify';

interface IProps {
  announcement: LawsuitParams,
}

export default function AnnouncementIdAdmin({ announcement }: IProps) {
  const router = useRouter();
  const [announcementUpdated, setAnnouncementUpdated] = useState(announcement as LawsuitParams);
  const [approvingLoader, setApprovingLoader] = useState(false);
  const [rejectingLoader, setRejectingLoader] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);
  const [editionRequestedLoader, setEditionRequestedLoader] = useState(false);
  const [announcementBeingEditionRequested, setAnnouncementBeingEditionRequested] = useState(false);
  const [isAnnouncementBeingDeleted, setIsAnnouncementBeingDeleted] = useState(false);
  const [messageEditionRequested, setMessageEditionRequested] = useState('');
  const hasMessageValid = messageEditionRequested.trim().length > 5;

  function factoryFinallyPromiseInCommon() {
    router.push('/admin/manage-announcements');
  }

  function handleOpenModalAnnouncementBeingEditionRequested() {
    setAnnouncementBeingEditionRequested(true);
  }

  function handleCloseModalAnnouncementBeingEditionRequested() {
    setAnnouncementBeingEditionRequested(false);
  }

  function handleOpenModalAnnouncementBeingDeleted() {
    setIsAnnouncementBeingDeleted(true);
  }

  function handleCloseModalAnnouncementBeingDeleted() {
    setIsAnnouncementBeingDeleted(false);
  }

  async function handleChangeAnnouncementStatusToAccepted() {
    try {
      setApprovingLoader(true);
      const { data: updated } = await adminServices.changeStatusAnnouncements({
        announcementId: announcement.id,
        status: 'accepted',
      });

      toast.success('Anúncio Aprovado');

      setAnnouncementUpdated((oldAnnouncement) => ({ ...oldAnnouncement, ...updated }));
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      setApprovingLoader(false);
      factoryFinallyPromiseInCommon();
    }
  }

  async function handleChangeAnnouncementStatusToReject() {
    try {
      setRejectingLoader(true);
      const { data: updated } = await adminServices.changeStatusAnnouncements({
        announcementId: announcement.id,
        status: 'rejected',
      });

      toast.success('Anúncio Rejeitado');
      setAnnouncementUpdated((oldAnnouncement) => ({ ...oldAnnouncement, ...updated }));
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      setRejectingLoader(false);
      factoryFinallyPromiseInCommon();
    }
  }

  async function handleChangeAnnouncementStatusToEditionRequested() {
    try {
      setEditionRequestedLoader(true);
      const { data: updated } = await adminServices.changeStatusAnnouncements({
        announcementId: announcement.id,
        status: 'edition_requested',
        editionRequirements: messageEditionRequested,
      });

      toast.success('Enviada a solicitação de edição');
      setAnnouncementUpdated((oldAnnouncement) => ({ ...oldAnnouncement, ...updated }));
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      setEditionRequestedLoader(false);
      handleCloseModalAnnouncementBeingEditionRequested();
      setMessageEditionRequested('');
      factoryFinallyPromiseInCommon();
    }
  }

  async function handleDeleteAnnouncement() {
    try {
      setDeletingLoader(true);
      await adminServices.deleteAnnouncementById(announcementUpdated.id);

      toast.success('Anúncio Deletado');
      router.push('/admin/manage-announcements');
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      handleCloseModalAnnouncementBeingDeleted();
      setDeletingLoader(false);
    }
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
          <LawsuitView announcement={announcementUpdated} />
        </Direction>
      </Section.Container>

      <Section.Container as="footer">
        <Direction direction="horizontal">
          <ButtonAntd
            type="primary"
            danger
            onClick={handleOpenModalAnnouncementBeingDeleted}
          >
            Deletar
          </ButtonAntd>

          <ButtonAntd
            type="ghost"
            danger
            disabled={announcementUpdated?.status === 'rejected'}
            onClick={handleChangeAnnouncementStatusToReject}
            loading={rejectingLoader}
          >
            Reprovar
          </ButtonAntd>

          <ButtonAntd
            type="primary"
            disabled={announcementUpdated?.status === 'accepted'}
            onClick={handleChangeAnnouncementStatusToAccepted}
            loading={approvingLoader}
          >
            Aprovar
          </ButtonAntd>

          <ButtonAntd type="ghost" onClick={handleOpenModalAnnouncementBeingEditionRequested}>
            Solicitar edição
          </ButtonAntd>
        </Direction>
      </Section.Container>

      <Modal
        title="Descreva a solicitação de edição"
        centered
        open={announcementBeingEditionRequested}
        onOk={handleChangeAnnouncementStatusToEditionRequested}
        onCancel={handleCloseModalAnnouncementBeingEditionRequested}
        okButtonProps={{
          loading: editionRequestedLoader,
          disabled: !hasMessageValid,
        }}
        cancelButtonProps={{
          disabled: editionRequestedLoader,
        }}
      >
        <Textarea
          style={{ width: '100%' }}
          placeholder="Digite Aqui..."
          value={messageEditionRequested}
          onChange={(e) => setMessageEditionRequested(e.target.value)}
        />
      </Modal>

      <AlertModal
        title="Deseja realmente deletar esse anúncio?"
        description="Tem certeza, absoluta? Após a confirmação essa ação não poderá ser revertida!"
        type="danger"
        isVisible={isAnnouncementBeingDeleted}
        confirm={{
          label: 'Sim, deletar',
          onConfirmButton: handleDeleteAnnouncement,
        }}
        cancel={{
          label: 'Cancelar',
          onCancelButton: handleCloseModalAnnouncementBeingDeleted,
        }}
        isLoading={deletingLoader}
      />
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
