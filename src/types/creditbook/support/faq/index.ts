export interface SectionFaqParams {
  creditbook: 'Creditbook',
  vendaCompraDireitosCreditoórios: 'Venda e Compra de Direitos Creditórios',
  anuncio: 'Anúncio',
  usuarios: 'Usuários',
  lotes: 'Lotes',
  habilitacaoParaCompra: 'Habilitação param a Compra',
  cessaoDireitosCreditos: 'Cessão de Direitos do Créditos',
  custos: 'Custos',
  outrasPerguntasFrequentes: 'Outras Perguntas Frequentes',
}

export interface QuestionResponseType {
  id: string,
  title: string,
  answer: string,
}

export interface FAQResponseType {
  faq: {
    section: keyof SectionFaqParams,
    questions: QuestionResponseType[]
  }[]
}
