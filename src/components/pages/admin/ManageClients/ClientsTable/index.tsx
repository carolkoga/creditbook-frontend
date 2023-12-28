/* eslint-disable react/no-unstable-nested-components */
import { Switch, Table, TableProps } from 'antd';
import { useMemo } from 'react';
import { Trash } from 'phosphor-react';
import { WrapperTable } from '../../WrapperTable';
import InformationTable from './InformationTable';
import { DataType } from './types';

interface IProps {
  dataSource: DataType[] | [],
  // eslint-disable-next-line no-unused-vars
  onChangeStatus: (clientId: string) => void,
  onClickDeleteUser: (userId: string) => void,
  changingStatusLoader: boolean,
  _tableProps?: TableProps<any>
}

export default function ClientsTable({
  dataSource,
  onChangeStatus,
  onClickDeleteUser,
  changingStatusLoader,
  _tableProps,
}: IProps) {
  const columns = useMemo(() => ([
    {
      title: 'Nome',
      dataIndex: 'fullName',
      key: 'fullName',
    },

    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Total de anúncios',
      dataIndex: 'announcements',
      key: 'announcements',
    },

    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      width: '15%',
      render: (isActive: boolean, record: DataType) => (
        <Switch
          defaultChecked
          checkedChildren={isActive ? 'Ativado' : 'Desativado'}
          unCheckedChildren={!isActive && 'Desativado'}
          onClick={() => onChangeStatus(record.id)}
          style={{ width: '100%' }}
          loading={changingStatusLoader}
          checked={isActive}
        />
      ),
    },

    {
      title: 'Deletar',
      dataIndex: 'delete',
      key: 'delete',
      width: '8%',
      render: (_: boolean, record: DataType) => (
        <Trash
          onClick={() => onClickDeleteUser(record.id)}
          cursor="pointer"
          style={{ width: '100%' }}
        />
      ),
    },
  ]), [changingStatusLoader, dataSource]);

  return (
    <WrapperTable>
      <Table
        rowKey={(record) => record.email}
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        expandable={{
          expandedRowRender: ({
            address, cellphone, type, deactivationReason, id,
          }: DataType) => (
            <InformationTable
              dataSource={{
                ...address,
                cellphone,
                type,
                deactivationReason,
                id,
              }}
            />
          ),
        }}
        {..._tableProps}
      />
    </WrapperTable>
  );
}

ClientsTable.defaultProps = {
  _tableProps: null,
};
