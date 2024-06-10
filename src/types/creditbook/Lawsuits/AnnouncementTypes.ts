export type AnnouncementTypes = 'physical' | 'digital';
export interface AnnouncementGender {
  civel: 'civel';
  trabalhista: 'trabalhista';
  fiscal: 'fiscal';
  precatorio: 'precatorio';
}
export interface AnnouncementKind {
  acaoIndenizatoria: 'acaoIndenizatoria';
  acaoCondenatoria: 'acaoCondenatoria';
  tituloJudicial: 'tituloJudicial';
  tituloExtrajudicial: 'tituloExtrajudicial';
  reclamacaoTrabalhista: 'reclamacaoTrabalhista';
  falencia: 'falencia';
  creditoFalimenter: 'creditoFalimenter';
  creditoTributario: 'creditoTributario';
}

export interface AnnouncementActionPhase {
  sentenciadaComRecurso: 'sentenciadaComRecurso';
  transitadaEmJulgado: 'transitadaEmJulgado';
  incidenteDeExecucao: 'incidenteDeExecucao';
  sentenciada: 'sentenciada';
  execucao: 'execucao';
  cumprimentoDeSentenca: 'cumprimentoDeSentenca';
}
