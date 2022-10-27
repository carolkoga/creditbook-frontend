import ClientsTable from '@components/pages/admin/ManageClients/ClientsTable';
import { Section } from '@components/Section';

export default function ManageClients() {
  return (
    <>
      <Section.Title as="h1" textColor="dark">Gerenciar Clientes</Section.Title>
      <ClientsTable
        onChangeStatus={(_id) => console.log(_id)}
        changingStatusLoader={false}
        dataSource={[
          {
            address: {
              city: 'Dah',
              number: '7',
              complement: '',
              address: 'Rua dos bobos',
              uf: 'SP',
              cep: '12351-6848',
            },
            name: 'Rebeca',
            amountAnnouncements: 1,
            cellphone: '0000000',
            email: 'rebeca@mail.com',
            key: '1',
            inactivationReason: null,
            status: 'active',
            type: 'person',
          },
        ]}
      />,
    </>
  );
}
