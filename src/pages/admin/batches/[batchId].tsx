import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Button as ButtonAntd, Modal } from 'antd';

import LawsuitCardList from '@components/LawsuitCard';
import { setupAPIClient } from '@api/creditbookApi';

import { Section } from '@components/Section';
import { Direction } from '@components/Direction';
import { Button } from '@components/Button';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { adminServices } from '@services/creditbook/admin';
import { Textarea } from '@components/Input';
import AlertModal from '@components/AdminFormModal/AlertModal';
import { toast } from 'react-toastify';
import { BatchParams } from '@type/creditbook/Batch';
import { BatchServices } from '@services/creditbook/batch';
import { BatchCard } from '@components/BatchCard/Card';

interface IProps {
  batch: BatchParams,
}

export default function BatchIdAdmin({ batch }: IProps) {
  const router = useRouter();
  const [batchUpdated, setBatchUpdated] = useState(batch as BatchParams);
  const [approvingLoader, setApprovingLoader] = useState(false);
  const [rejectingLoader, setRejectingLoader] = useState(false);
  const [deletingLoader, setDeletingLoader] = useState(false);
  const [editionRequestedLoader, setEditionRequestedLoader] = useState(false);
  const [batchBeingEditionRequested, setBatchBeingEditionRequested] = useState(false);
  const [isBatchBeingDeleted, setIsBatchBeingDeleted] = useState(false);
  const [messageEditionRequested, setMessageEditionRequested] = useState('');
  const hasMessageValid = messageEditionRequested.trim().length > 5;

  function factoryFinallyPromiseInCommon() {
    router.push('/admin/manage-batches');
  }

  function handleOpenModalBatchBeingEditionRequested() {
    setBatchBeingEditionRequested(true);
  }

  function handleCloseModalBatchBeingEditionRequested() {
    setBatchBeingEditionRequested(false);
  }

  function handleOpenModalBatchBeingDeleted() {
    setIsBatchBeingDeleted(true);
  }

  function handleCloseModalBatchBeingDeleted() {
    setIsBatchBeingDeleted(false);
  }

  async function handleChangeBatchStatusToAccepted() {
    try {
      setApprovingLoader(true);
      const { data: updated } = await adminServices.changeStatusBatches({
        batchId: batch.id,
        status: 'active',
      });

      toast.success('Lote Aprovado');

      setBatchUpdated((oldBatch) => ({ ...oldBatch, ...updated }));
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      setApprovingLoader(false);
      factoryFinallyPromiseInCommon();
    }
  }

  async function handleChangeBatchStatusToReject() {
    try {
      setRejectingLoader(true);
      const { data: updated } = await adminServices.changeStatusBatches({
        batchId: batch.id,
        status: 'rejected',
      });

      toast.success('Anúncio Rejeitado');
      setBatchUpdated((oldBatch) => ({ ...oldBatch, ...updated }));
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      setRejectingLoader(false);
      factoryFinallyPromiseInCommon();
    }
  }

  async function handleChangeBatchStatusToEditionRequested() {
    try {
      setEditionRequestedLoader(true);
      const { data: updated } = await adminServices.changeStatusBatches({
        batchId: batch.id,
        status: 'edition_requested',
        editionRequirements: messageEditionRequested,
      });

      toast.success('Enviada a solicitação de edição');
      setBatchUpdated((oldBatch) => ({ ...oldBatch, ...updated }));
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      setEditionRequestedLoader(false);
      handleCloseModalBatchBeingEditionRequested();
      setMessageEditionRequested('');
      factoryFinallyPromiseInCommon();
    }
  }

  async function handleDeleteBatch() {
    try {
      setDeletingLoader(true);
      await adminServices.deleteBatchById(batchUpdated.id);

      toast.success('Anúncio Deletado');
      router.push('/admin/manage-batches');
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      handleCloseModalBatchBeingDeleted();
      setDeletingLoader(false);
    }
  }

  return (
    <>
      <Section.Header>
        <Button variant="white" onClick={factoryFinallyPromiseInCommon}>Voltar</Button>
      </Section.Header>

      <Section.Container>
        <Direction>
          <BatchCard mine={false} batch={batch} admin />
          <br />
        </Direction>

        <Section.Container as="footer">
          <Direction direction="horizontal">
            <ButtonAntd
              type="primary"
              danger
              onClick={handleOpenModalBatchBeingDeleted}
            >
              Deletar
            </ButtonAntd>

            <ButtonAntd
              type="ghost"
              danger
              disabled={batchUpdated?.status === 'rejected'}
              onClick={handleChangeBatchStatusToReject}
              loading={rejectingLoader}
            >
              Reprovar
            </ButtonAntd>

            <ButtonAntd
              type="primary"
              disabled={batchUpdated?.status === 'active'}
              onClick={handleChangeBatchStatusToAccepted}
              loading={approvingLoader}
            >
              Aprovar
            </ButtonAntd>

            <ButtonAntd type="ghost" onClick={handleOpenModalBatchBeingEditionRequested}>
              Solicitar edição
            </ButtonAntd>
          </Direction>
        </Section.Container>

        <Modal
          title="Descreva a solicitação de edição"
          centered
          open={batchBeingEditionRequested}
          onOk={handleChangeBatchStatusToEditionRequested}
          onCancel={handleCloseModalBatchBeingEditionRequested}
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
          isVisible={isBatchBeingDeleted}
          confirm={{
            label: 'Sim, deletar',
            onConfirmButton: handleDeleteBatch,
          }}
          cancel={{
            label: 'Cancelar',
            onCancelButton: handleCloseModalBatchBeingDeleted,
          }}
          isLoading={deletingLoader}
        />
      </Section.Container>

      {batch?.announcement.length > 0 && (
        <Section.Container>
          <Section.Title>Anúncios desse lote</Section.Title>
          <LawsuitCardList
            isLoading={false}
            announcements={{ results: batch.announcement, pages: 0 }}
            lawsuitCardProps={{
              batchIdForActions: batch.id,
            }}
            admin
          />
        </Section.Container>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const api = setupAPIClient(req.cookies['nextauth.token']);
  const batchServices = new BatchServices(api);
  const { data } = await batchServices.show(query.batchId as string);

  return {
    props: {
      batch: data,
    },
  };
};
