import { LawsuitParamsID } from '@type/creditbook/Lawsuits';

export const lawsuitsMock: LawsuitParamsID[] = [
  {
    id: '1',
    processGender: 'civel',
    actionPhase: 'cumprimentoDeSentenca',
    city: 'São Paulo',
    uf: 'SP',
    kind: 'acaoCondenatoria',
    owner: 'Rebeca Elisa Cecilia Nascimento',

  } as LawsuitParamsID,

  {
    id: '2',
    processGender: 'fiscal',
    actionPhase: 'naoSentenciada',
    city: 'Ribeirão preto',
    uf: 'sp',
    kind: 'falencia',
  } as LawsuitParamsID,

  {
    id: '3',
    processGender: 'precatorio',
    actionPhase: 'transitadaEmJulgado',
    city: 'Osasco',
    uf: 'sp',
    kind: 'creditoFalimenter',
    batchId: '12',
  } as LawsuitParamsID,

  {
    id: '4',
    processGender: 'trabalhista',
    actionPhase: 'execucao',
    city: 'Guarulhos',
    uf: 'sp',
    kind: 'reclamacaoTrabalhista',
    owner: 'Rebeca Elisa Cecilia Nascimento',
    batchId: '12',
  } as LawsuitParamsID,

  {
    id: '5',
    processGender: 'trabalhista',
    actionPhase: 'execucao',
    city: 'Guarulhos',
    uf: 'sp',
    kind: 'reclamacaoTrabalhista',
    owner: 'Rebeca Elisa Cecilia Nascimento',

  } as LawsuitParamsID,

  {
    id: '6',
    processGender: 'fiscal',
    actionPhase: 'execucao',
    city: 'Guarulhos',
    uf: 'sp',
    kind: 'acaoIndenizatoria',
    owner: 'Rebeca Elisa Cecilia Nascimento',
    batchId: '12',
  } as LawsuitParamsID,
];
