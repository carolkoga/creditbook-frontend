import { Table, TableProps } from 'antd';
import { BatchesAdminResponse } from '@type/creditbook/admin';
import { Info } from 'phosphor-react';
import Link from 'next/link';
import { WrapperTable } from '../../WrapperTable';

interface IProps extends TableProps<any> {
  dataSource: BatchesAdminResponse['batches'],
}

const columns = [
  {
    title: 'Sobre',
    dataIndex: 'id',
    key: 'id',
    render: (id: string) => (
      <Link href={`/admin/batches/${id}`}>
        <a>
          <Info size={32} />
        </a>
      </Link>
    ),
    width: '42px',
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Plano',
    dataIndex: 'plan',
    key: 'plan',
  },
];

export default function BatchesTable({ dataSource, ...rest }: IProps) {
  return (
    <WrapperTable>
      <Table columns={columns} dataSource={dataSource} {...rest} />
    </WrapperTable>
  );
}
