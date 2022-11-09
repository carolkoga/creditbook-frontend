/* eslint-disable react/no-unstable-nested-components */
import { Address } from '@type/creditbook';
import formatPhone from '@utils/formatPhone';
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

const translationAccountType = { person: 'Física', corporation: 'Juridica' };

const columns = [
  {
    title: 'Pessoa',
    dataIndex: 'type',
    key: 'type',
    render: (accountType: 'person' | 'corporation') => translationAccountType[accountType],
  },

  {
    title: 'Celular',
    dataIndex: 'cellphone',
    key: 'cellphone',
    render: (cellphone: string) => formatPhone(cellphone),
  },

  {
    title: 'Rua',
    dataIndex: 'address',
    key: 'address',
  },

  {
    title: 'Número',
    dataIndex: 'number',
    key: 'number',
  },

  {
    title: 'Cidade',
    dataIndex: 'city',
    key: 'city',
  },

  {
    title: 'CEP',
    dataIndex: 'cep',
    key: 'cep',
  },

  {
    title: 'UF',
    dataIndex: 'uf',
    key: 'uf',
  },

  {
    title: 'Complemento',
    dataIndex: 'complement',
    key: 'complement',
  },

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
