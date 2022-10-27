/* eslint-disable react/no-unstable-nested-components */
import { Switch, Table } from 'antd';
import { useMemo } from 'react';
import InformationTable from './InformationTable';
import { DataType } from './tyoes';

interface IProps {
  dataSource: DataType[] | [],
  // eslint-disable-next-line no-unused-vars
  onChangeStatus: (clientId: string) => void,
  changingStatusLoader: boolean,
}

export default function ClientsTable({ dataSource, onChangeStatus, changingStatusLoader }: IProps) {
  const columns = useMemo(() => ([
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Total de anúncios',
      dataIndex: 'amountAnnouncements',
      key: 'amountAnnouncements',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: 'active' | 'inactive', record: DataType) => (
        <Switch
          defaultChecked
          checkedChildren={status === 'active' && 'Ativado'}
          unCheckedChildren={status !== 'inactive' && 'Desativado'}
          onClick={() => onChangeStatus(record.key)}
          loading={changingStatusLoader}
        />
      ),
    },
  ]), [changingStatusLoader, dataSource]);

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      expandable={{
        expandedRowRender: ({
          address, cellphone, type, inactivationReason, key,
        }: DataType) => (
          <InformationTable
            dataSource={{
              ...address,
              cellphone,
              type,
              inactivationReason,
              key,
            }}
          />
        ),
      }}
    />
  );
}
