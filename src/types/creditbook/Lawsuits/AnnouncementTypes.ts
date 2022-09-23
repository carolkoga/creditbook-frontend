export enum AnnouncementTypes {
  'physical' = 'physical',
  'digital' = 'digital',
}
export interface AnnouncementGender {
  civel: 'civel',
  trabalhista: 'trabalhista',
  fiscal: 'fiscal',
  precatorio: 'precatorio',
}
export enum AnnouncementKind {
  acaoIndenizatoria,
  acaoCondenatoria,
  tituloJudicial,
  tituloExtrajudicial,
  reclamacaoTrabalhista,
  falencia,
  creditoFalimenter,
  creditoTributario
}
export enum AnnouncementActionPhase {
  naoSentenciada,
  sentenciadaComRecurso,
  transitadaEmJulgado,
  incidenteDeExecucao,
  sentenciada,
  execucao,
  cumprimentoDeSentenca
}
