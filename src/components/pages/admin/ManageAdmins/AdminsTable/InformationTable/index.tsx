/* eslint-disable react/no-unstable-nested-components */
import { Address } from '@type/creditbook';
import { Table } from 'antd';

interface DataType extends Address {
  id: string,
  cellphone: string,
  type: 'person' | 'corporation',
  deactivationReason: string | null,
}

interface IProps {
  dataSource: DataType | {},
}

const columns = [
  {
    title: 'Motivo da desativação',
    dataIndex: 'deactivationReason',
    key: 'deactivationReason',
    render: (reason: string) => (reason && <p>{reason}</p>),
  },
];

export default function InformationTable({ dataSource }: IProps) {
  return (
    <Table
      // @ts-ignore
      rowKey={(record) => record.id}
      columns={columns}
      dataSource={[dataSource]}
      pagination={false}
      size="small"
    />
  );
}
