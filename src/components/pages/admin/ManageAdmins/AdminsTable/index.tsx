/* eslint-disable react/no-unstable-nested-components */
import { Switch, Table, TableProps } from 'antd';
import { useMemo } from 'react';
import { WrapperTable } from '../../WrapperTable';
import InformationTable from './InformationTable';
import { DataType } from './types';

interface IProps {
  dataSource: DataType[] | [],
  // eslint-disable-next-line no-unused-vars
  onChangeStatus: (clientId: string) => void,
  changingStatusLoader: boolean,
  _tableProps?: TableProps<any>
}

export default function AdminsTable({
  dataSource,
  onChangeStatus,
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

AdminsTable.defaultProps = {
  _tableProps: null,
};
