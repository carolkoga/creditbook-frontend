import Link from 'next/link';
import { Info } from 'phosphor-react';
import { Table, TableProps } from 'antd';
import { NewLawsuitParamsResponse } from '@services/creditbook/admin';
import { WrapperTable } from '../../WrapperTable';

interface IProps extends TableProps<any> {
  dataSource: NewLawsuitParamsResponse[] | [],
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
      <Link href={`/admin/announcements/${id}`}>
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
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (createdAt: string) => new Date(createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
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

export default function AnnouncementsTable({ dataSource, ...rest }: IProps) {
  return (
    <WrapperTable>
      <Table columns={columns} dataSource={dataSource} {...rest} />
    </WrapperTable>
  );
}
