/* eslint-disable max-len */
import AdminFormModal from '@components/AdminFormModal';
import { Textarea } from '@components/Input';
import AdminsTable from '@components/pages/admin/ManageAdmins/AdminsTable';
import { Section } from '@components/Section';
import { adminServices } from '@services/creditbook/admin';
import { UserParams } from '@type/creditbook/admin';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { Modal } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ManageAdmins() {
  const [admins, setAdmins] = useState([] as UserParams[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [deactivationUser, setDeactivationUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createAdminModal, setCreateAdminModal] = useState(false);
  const [deactivationReason, setDeactivationReason] = useState('');
  const [userId, setUserId] = useState('');
  const isMessageValid = deactivationReason.length > 5;

  function handleCloseModalDeactivationUser() {
    setDeactivationUser(false);
    setUserId('');
    setDeactivationReason('');
    setLoading(false);
  }

  const loadAdmins = useCallback(async (params?: { page?: number }) => {
    try {
      const response = await adminServices.indexAdmins(params);
      setAdmins(response.data.admins);
      setTotalPages(response.data.pages * 10);
      setCurrentPage(response.config.params.page);
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

      const clientBeingEdited = admins.find((currentAdmin) => currentAdmin?.id === userId);
      const action = (isActive ?? clientBeingEdited?.isActive) ? 'deactivate' : 'active';

      await adminServices.changeStatusAdmin({
        isActive: action !== 'deactivate',
        adminId: currentId,
      });

      await loadAdmins({
        page: currentPage,
      });
    } catch (error) {
      handleCatchErrorRequest(error as never);
    } finally {
      handleCloseModalDeactivationUser();
    }
  }

  function handleOpenCreateAdminModal() {
    setCreateAdminModal(true);
  }

  function handleCloseCreateAdminModal() {
    setCreateAdminModal(false);
  }

  async function handleConfirmCreateAdminForm(event: any) {
    event.preventDefault();

    const {
      fullname, email, password, passwordConfirmation,
    } = event.target;

    if (password.value !== passwordConfirmation.value) {
      toast.warn('as senhas não correspondem');
      return;
    }

    try {
      const response = await adminServices.createAdmin({
        fullname: fullname.value, email: email.value, password: password.value, passwordConfirmation: passwordConfirmation.value,
      });

      if (response.status < 300 && response.status >= 200) {
        toast.success('admin criado com sucesso');
      }

      handleCloseCreateAdminModal();
      setAdmins((prevState) => [...prevState, response.data]);
    } catch (error) {
      toast.error('ocorreu um erro, tente novamente');
    }
  }

  function handleOpenModalDeactivationUser(id: string) {
    setDeactivationUser(true);
    setUserId(id);
  }

  function handleNeedOpenModalOrChangeStatusUserDirect(id: string) {
    const clientBeingEdited = admins.find((currentAdmin) => currentAdmin?.id === id);

    if (!clientBeingEdited?.isActive) {
      return handleChangeUserStatus({ id, isActive: clientBeingEdited?.isActive });
    }

    handleOpenModalDeactivationUser(id);
  }

  useEffect(() => {
    loadAdmins();
  }, [loadAdmins]);
  return (
    <>
      {createAdminModal
        && (
        <AdminFormModal
          onCancel={handleCloseCreateAdminModal}
          onConfirm={handleConfirmCreateAdminForm}
        />
        )}

      <Section.Title as="h1" textColor="dark">Gerenciar Admins
        <span>
          <button type="button" onClick={handleOpenCreateAdminModal} style={{ marginLeft: '10px', padding: '0px 12px' }}> + </button>
        </span>
      </Section.Title>
      <AdminsTable
        onChangeStatus={handleNeedOpenModalOrChangeStatusUserDirect}
        changingStatusLoader={false}
        dataSource={admins}
        _tableProps={{
          pagination: {
            total: totalPages,
            onChange: (page) => loadAdmins({ page }),
            current: currentPage,
          },
        }}
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
