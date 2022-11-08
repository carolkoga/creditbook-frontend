import ClientsTable from '@components/pages/admin/ManageClients/ClientsTable';
import { Section } from '@components/Section';
import { adminServices } from '@services/creditbook/admin';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { useCallback, useEffect, useState } from 'react';

export default function ManageClients() {
  const [clients, setClients] = useState([]);

  const loadClients = useCallback(async () => {
    try {
      const response = await adminServices.indexUsers();
      setClients(response.data);
    } catch (error) {
      handleCatchErrorRequest(error as never);
    }
  }, []);

  useEffect(() => {
    loadClients();
  }, [loadClients]);
  return (
    <>
      <Section.Title as="h1" textColor="dark">Gerenciar Clientes</Section.Title>
      <ClientsTable
        onChangeStatus={(_id) => console.log(_id)}
        changingStatusLoader={false}
        dataSource={clients}
      />,
    </>
  );
}
