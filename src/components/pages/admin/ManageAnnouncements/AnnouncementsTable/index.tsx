import Link from 'next/link';
import { Info } from 'phosphor-react';
import { Table } from 'antd';

interface DataType {
  key: string,
  announcementId: string,
  announcementDate: string,
  processNumber: string,
  plan: string,
}

interface IProps {
  dataSource: DataType[] | [],
}

const columns = [
  {
    title: 'Sobre',
    dataIndex: 'announcementId',
    key: 'announcementId',
    render: (announcementId: string) => (
      <Link href={`/admin/announcements/${announcementId}`}>
        <a>
          <Info size={32} />
        </a>
      </Link>
    ),
    width: '42px',
  },

  {
    title: 'Número do Processo',
    dataIndex: 'processNumber',
    key: 'processNumber',
  },

  {
    title: 'Data do Anúncio',
    dataIndex: 'announcementDate',
    key: 'announcementDate',
  },

  {
    title: 'Plano',
    dataIndex: 'plan',
    key: 'plan',
  },

];

export default function AnnouncementsTable({ dataSource }: IProps) {
  return (
    <Table columns={columns} dataSource={dataSource} />
  );
}
