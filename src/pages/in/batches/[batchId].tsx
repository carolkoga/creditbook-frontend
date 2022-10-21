import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';

import { Button } from '@components/Button';
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
import { Alert } from 'antd';

interface IProps {
  initialBatch: BatchParams
}

export default function ShowBatchPage({ initialBatch }: IProps) {
  const router = useRouter();
  const [batch, setBatch] = useState(initialBatch);
  const [modalBatchBeingDelete, setModalBatchBeingDelete] = useState<boolean>(false);
  const [deletingLoading, setDeletingLoading] = useState<boolean>(false);
  const [updatingLoading, setUpdatingLoading] = useState<boolean>(false);

  const methods = useForm<NewBatchParams>({
    defaultValues: {
      name: batch.name,
      description: batch.description,
      value: batch.value,
    },
  });

  function handleOpenModalCanDeleteBatchConfirmation() {
    setModalBatchBeingDelete(true);
  }

  function handleCloseModalCanDeleteBatchConfirmation() {
    setModalBatchBeingDelete(false);
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
        <Alert
          message="Atenção - Plano percentual (8% sobre a venda)"
          description="Os anúncios em lote oferecem apenas o plano percentual como forma de pagamento. Lembramos que os anúncios feitos em lote farão parte automaticamente da Galeria Premium."
          type="warning"
          showIcon
          closable={false}
        />
        <Alert
          message="Atenção"
          description="O lote será ativado automaticamente após adicionar ao menos um anúncio"
          type="warning"
          showIcon
          closable={false}
        />
      </Section.Header>

      <Section.Container>
        <Direction>
          <Section.Title as="h1">Lote: {batch.name}</Section.Title>
          <FormProvider {...methods}>
            <BatchForm onSubmit={methods.handleSubmit(handleUpdateBatch)}>
              <WrapperActionsForm>
                <Button type="submit" isLoading={updatingLoading}>
                  Salvar
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  onClick={handleOpenModalCanDeleteBatchConfirmation}
                >
                  Inativar
                </Button>
              </WrapperActionsForm>
            </BatchForm>
          </FormProvider>
        </Direction>
      </Section.Container>

      <AlertModal
        title={`Você está preste a inativar o lote ${batch.name}`}
        isLoading={deletingLoading}
        isVisible={modalBatchBeingDelete}
        type="default"
        confirm={{
          label: 'Sim, inativar o lote',
          onConfirmButton: handleDeleteBatch,
        }}
        cancel={{
          label: 'Cancelar',
          onCancelButton: handleCloseModalCanDeleteBatchConfirmation,
        }}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const api = setupAPIClient(req.cookies['nextauth.token']);
  const batchService = new BatchServices(api);
  const { data } = await batchService.show(query.batchId as string);
  return {
    props: {
      initialBatch: data,
    },
  };
};
