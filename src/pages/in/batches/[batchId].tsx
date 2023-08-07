import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
// import { Alert } from 'antd';

import { Button, Link } from '@components/Button';
import { Direction } from '@components/Direction';
import BatchForm from '@components/pages/in/batches/BatchForm';
import { Section } from '@components/Section';
import { useState } from 'react';
import { BatchServices, batchServices } from '@services/creditbook/batch';
import { GetServerSideProps } from 'next';
import { setupAPIClient } from '@api/creditbookApi';
import { BatchParams, NewBatchParams } from '@type/creditbook/Batch';
import { WrapperActionsForm } from '@styles/pages/in/batches';
import AlertModal from '@components/AlertModal';
import { toast } from 'react-toastify';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import LawsuitCardList from '@components/LawsuitCard';
// import useUserAnnouncements from '@services/creditbook/lawsuit/hooks/useUserAnnouncements';
import convertToCurrency from '@utils/convertToCurrency';
import NewLawsuit from '../ads/new';

interface IProps {
  initialBatch: BatchParams
}

export default function ShowBatchPage({
  initialBatch,
}: IProps) {
  const router = useRouter();
  const [batch, setBatch] = useState(initialBatch);
  const [modalBatchBeingDelete, setModalBatchBeingDelete] = useState<boolean>(false);
  const [modalBatchCreationFinishing, setModalBatchCreationFinishing] = useState<boolean>(false);
  const [deletingLoading, setDeletingLoading] = useState<boolean>(false);
  const [updatingLoading, setUpdatingLoading] = useState<boolean>(false);
  const [finishingLoading, setFinishingLoading] = useState<boolean>(false);
  const [announcementsInBatch, setAnnouncementsInBatch] = useState(
    { announcements: { results: batch.announcement, pages: 1 } },
  );

  // const announcementsInBatch = useUserAnnouncements({
  //   params: {
  //     batchId: router.query.batchId || batch.id,
  //   },
  // });

  const isCreating = Boolean(router.query?.creating) || batch.status === 'being_created';

  // const announcementsResponse = useUserAnnouncements({
  //   params: {
  //     type: 'single',
  //   },
  // });

  const methods = useForm<NewBatchParams>({
    defaultValues: {
      name: batch.name,
      description: batch.description,
      value: convertToCurrency(Number(batch.value)),
    },
  });

  function handleOpenModalCanDeleteBatchConfirmation() {
    setModalBatchBeingDelete(true);
  }

  function handleCloseModalCanDeleteBatchConfirmation() {
    setModalBatchBeingDelete(false);
  }

  function handleCloseModalCanFinishBatchCreation() {
    setModalBatchCreationFinishing(false);
  }

  function backToLastRoute() {
    router.back();
  }

  async function handleDeleteBatch() {
    try {
      setDeletingLoading(true);
      await batchServices.delete(batch.id);
      router.push('/in/batches');

      toast.success('O lote foi deletado com sucesso');
    } catch (error) {
      handleCatchErrorRequest(error as any);
    } finally {
      setDeletingLoading(false);
    }
  }

  async function handleFinishBatchCreating() {
    try {
      setFinishingLoading(true);
      await batchServices.update({ id: batch.id, batch: { status: 'inactive' } });

      toast.success('O lote foi criado com sucesso');
    } catch (error) {
      handleCatchErrorRequest(error as any);
    } finally {
      setFinishingLoading(false);
    }
  }

  async function handleUpdateBatch(updateBatch: NewBatchParams) {
    try {
      setUpdatingLoading(true);
      const { data } = await batchServices.update({
        id: batch.id,
        batch: updateBatch,
      });
      setBatch(data);

      toast.success('O lote foi atualizado');
    } catch (error) {
      handleCatchErrorRequest(error as any);
    } finally {
      setUpdatingLoading(false);
    }
  }

  return (
    <>
      <Section.Header>
        <Button variant="white" onClick={backToLastRoute}>Voltar</Button>
        {/* <Alert
          message="Atenção - Plano percentual (8% sobre a venda)"
          description="Os anúncios em lote oferecem apenas o plano percentual
          como forma de pagamento.
          Lembramos que os anúncios feitos em lote farão parte automaticamente da Galeria Premium."
          type="warning"
          showIcon
          closable={false}
        /> */}
        {/* <Alert
          message="Atenção"
          description="O lote será ativado automaticamente após adicionar ao menos um anúncio"
          type="warning"
          showIcon
          closable={false}
        /> */}
      </Section.Header>

      <Section.Container>
        <Direction>
          <Section.Title as="h1">Lote: {batch.name}</Section.Title>
          <FormProvider {...methods}>
            <BatchForm onSubmit={methods.handleSubmit(handleUpdateBatch)} disableValue>
              <WrapperActionsForm>
                {!isCreating
                  && (
                  <Button type="submit" isLoading={updatingLoading}>
                    Salvar
                  </Button>
                  )}
                <Button
                  type="button"
                  variant="danger"
                  onClick={handleOpenModalCanDeleteBatchConfirmation}
                >
                  Deletar
                </Button>

                {batch.announcementQuantity > 0 && (
                  <Link
                    variant="secondary"
                    replace
                    href={`/in/sale/declare?processId=${batch.id}`}
                  >
                    Comunicar  Venda
                  </Link>
                )}
              </WrapperActionsForm>
            </BatchForm>
          </FormProvider>
        </Direction>

        <br />
        <br />
        <br />

        {isCreating && (
        <NewLawsuit
          batchId={batch.id}
          setAnnouncementsInBatch={setAnnouncementsInBatch}
        />
        )}
      </Section.Container>

      {announcementsInBatch?.announcements.results?.length > 0 && (
        <Section.Container>
          <Section.Title>Anúncios desse lote</Section.Title>
          <LawsuitCardList
            isLoading={false}
            {...announcementsInBatch}
            lawsuitCardProps={{
              batchIdForActions: batch.id,
            }}
          />
        </Section.Container>
      )}

      <br />
      <br />
      <br />

      {isCreating && (
      <Button onClick={() => setModalBatchCreationFinishing(true)}>
        Concluir Criação do Lote
      </Button>
      )}

      {/* {announcementsResponse?.announcements?.results?.length > 0 && (
        <Section.Container>
          <Section.Title>Adicionar Anúncios ao lote</Section.Title>
          <LawsuitCardList
            {...announcementsResponse}
            lawsuitCardProps={{
              batchIdForActions: batch.id,
            }}
          />
        </Section.Container>
      )} */}

      <AlertModal
        title={`Você está preste a deletar o lote: ${batch.name}`}
        description="Essa ação não poderá ser desfeita. Todos os anúncios que estiver nesse lote deixarão de fazer parte da galeria premium!"
        isLoading={deletingLoading}
        isVisible={modalBatchBeingDelete}
        type="danger"
        _css={{ maxWidth: '625px' }}
        confirm={{
          label: 'Sim, deletar o lote',
          onConfirmButton: handleDeleteBatch,
        }}
        cancel={{
          label: 'Cancelar',
          onCancelButton: handleCloseModalCanDeleteBatchConfirmation,
        }}
      />

      <AlertModal
        title={`Você está preste a concluir a criação do lote: ${batch.name}`}
        description="Você não poderá alterar os anúncios desse lote posteriormente"
        isLoading={finishingLoading}
        isVisible={modalBatchCreationFinishing}
        type="danger"
        _css={{ maxWidth: '625px' }}
        confirm={{
          label: 'Sim, concluir',
          onConfirmButton: handleFinishBatchCreating,
        }}
        cancel={{
          label: 'Cancelar',
          onCancelButton: handleCloseModalCanFinishBatchCreation,
        }}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({ query, req }) => {
  const api = setupAPIClient(req.cookies['nextauth.token']);
  const batchService = new BatchServices(api);
  const { data } = await batchService.show(query.batchId as string);

  return {
    props: {
      initialBatch: data,
    },
  };
};
