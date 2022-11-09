import { Textarea } from '@components/Input';
import ClientsTable from '@components/pages/admin/ManageClients/ClientsTable';
import { Section } from '@components/Section';
import { adminServices } from '@services/creditbook/admin';
import { UserParams } from '@type/creditbook/admin';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { Modal } from 'antd';
import { useCallback, useEffect, useState } from 'react';

export default function ManageClients() {
  const [clients, setClients] = useState([] as UserParams[]);
  const [deactivationUser, setDeactivationUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deactivationReason, setDeactivationReason] = useState('');
  const [userId, setUserId] = useState('');
  const isMessageValid = deactivationReason.length > 5;

  function handleCloseModalDeactivationUser() {
    setDeactivationUser(false);
    setUserId('');
    setDeactivationReason('');
    setLoading(false);
  }

  const loadClients = useCallback(async () => {
    try {
      const response = await adminServices.indexUsers();
      setClients(response.data);
    } catch (error) {
      handleCatchErrorRequest(error as never);
    }
  }, []);

  async function handleChangeUserStatus({
    id = null, isActive = null,
  }: { id?: string | null, isActive?: boolean | null }) {
    try {
      setLoading(true);
      const currentId = id ?? userId as string;

      const clientBeingEdited = clients.find((currentClient) => currentClient?.id === userId);
      const action = (isActive ?? clientBeingEdited?.isActive) ? 'deactivate' : 'active';

      await adminServices.changeStatusUser({
        action,
        userId: currentId,
        deactivationReason,
      });

      setClients((oldClients) => oldClients.filter((currentClient) => (
        currentClient.id === currentId
          ? { ...currentClient, isActive: action === 'active', deactivationReason }
          : currentClient
      )));
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      handleCloseModalDeactivationUser();
    }
  }

  function handleOpenModalDeactivationUser(id: string) {
    setDeactivationUser(true);
    setUserId(id);
  }

  function handleNeedOpenModalOrChangeStatusUserDirect(id: string) {
    const clientBeingEdited = clients.find((currentClient) => currentClient?.id === id);

    if (!clientBeingEdited?.isActive) {
      return handleChangeUserStatus({ id, isActive: clientBeingEdited?.isActive });
    }

    handleOpenModalDeactivationUser(id);
  }

  useEffect(() => {
    loadClients();
  }, [loadClients]);
  return (
    <>
      <Section.Title as="h1" textColor="dark">Gerenciar Clientes</Section.Title>
      <ClientsTable
        onChangeStatus={handleNeedOpenModalOrChangeStatusUserDirect}
        changingStatusLoader={false}
        dataSource={clients}
      />,

      <Modal
        title="Descreva o motivo da desativação"
        centered
        open={deactivationUser}
        onOk={() => handleChangeUserStatus({ id: null, isActive: null })}
        onCancel={handleCloseModalDeactivationUser}
        okButtonProps={{
          loading,
          disabled: !isMessageValid,
        }}
        cancelButtonProps={{
          disabled: loading,
        }}
      >
        <Textarea
          style={{ width: '100%' }}
          placeholder="Digite Aqui..."
          value={deactivationReason}
          onChange={(e) => setDeactivationReason(e.target.value)}
        />
      </Modal>

    </>
  );
}
