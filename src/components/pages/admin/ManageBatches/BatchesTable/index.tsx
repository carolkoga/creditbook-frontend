import { Table, TableProps } from 'antd';
import { BatchesAdminResponse } from '@type/creditbook/admin';
import { Info } from 'phosphor-react';
import Link from 'next/link';
import { WrapperTable } from '../../WrapperTable';

interface IProps extends TableProps<any> {
  dataSource: BatchesAdminResponse['batches'],
}

const planIs = [
  {
    plan: 'byPercent',
    ptBR: '8%',
  },

  {
    plan: 'byMonth',
    ptBR: 'Mensal',
  },

  {
    plan: 'byPercent + isPremium',
    ptBR: '8% + Premium',
  },

  {
    plan: 'byMonth + Premium',
    ptBR: 'Mensal + Premium',
  },

  {
    plan: 'both',
    ptBR: '8% + Mensal',
  },

  {
    plan: 'both + Premium',
    ptBR: '8% + Mensal + Premium',
  },
];

const columns = [
  {
    title: 'Sobre',
    dataIndex: 'id',
    key: 'id',
    render: (id: string) => (
      <Link legacyBehavior href={`/admin/batches/${id}`}>
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
    render: (plan: string) => {
      const selectedPlan = planIs.find((currentPlan) => currentPlan.plan === plan);

      return selectedPlan ? selectedPlan.ptBR : 'Sem Plano';
    },
  },
];

export default function BatchesTable({ dataSource, ...rest }: IProps) {
  return (
    <WrapperTable>
      <Table columns={columns} dataSource={dataSource} {...rest} />
    </WrapperTable>
  );
}
