import { translationSectionFAQ } from '@mocks/FAQ';

interface FAQ {
  label: string,
  value: keyof typeof translationSectionFAQ;
}

export const FAQSections: FAQ[] = [
  {
    label: 'Creditbook',
    value: 'creditbook',
  },

  {
    label: 'Venda e Compra de Direitos Creditórios',
    value: 'vendaCompraDireitosCreditoórios',
  },

  {
    label: 'Anúncio',
    value: 'anuncio',
  },

  {
    label: 'Usuários',
    value: 'usuarios',
  },

  {
    label: 'Lotes',
    value: 'lotes',
  },

  {
    label: 'Habilitação para a Compra',
    value: 'habilitacaoParaCompra',
  },

  {
    value: 'cessaoDireitosCreditos',
    label: 'Cessão de Direitos do Créditos',
  },

  {
    label: 'Custos',
    value: 'custos',
  },

  {
    label: 'Outras Perguntas Frequentes',
    value: 'outrasPerguntasFrequentes',
  },
];
