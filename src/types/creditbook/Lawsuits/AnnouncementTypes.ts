export enum AnnouncementTypes {
  'physical' = 'physical',
  'digital' = 'digital',
}
export enum AnnouncementGender {
  civel,
  trabalhista,
  fiscal,
  precatorio
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
