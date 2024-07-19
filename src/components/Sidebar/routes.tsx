import {
  House,
  ShoppingCart,
  CurrencyCircleDollar,
  Heart,
  Star,
  Gear,
  DiceSix,
  DiceTwo,
} from 'phosphor-react';

const DEFAULT_PATH = '/in';

export const routes = [
  {
    label: 'Pagina Inicial',
    icon: <House size={24} weight="regular" />,
    link: `${DEFAULT_PATH}/home`,
  },

  {
    label: 'Pagina Creditbook',
    icon: <House size={24} weight="regular" />,
    link: '/',
  },

  {
    label: 'Comprar',
    icon: <ShoppingCart size={24} weight="regular" />,
    link: '/in/ads/ads',
  },

  {
    label: 'Favoritos',
    icon: <Heart size={24} weight="regular" />,
    link: `${DEFAULT_PATH}/my-favorites`,
  },

  {
    label: 'Novo Anúncio Individual',
    icon: <DiceSix size={24} weight="regular" />,
    link: `${DEFAULT_PATH}/ads/new`,
  },

  {
    label: 'Meus Anúncios',
    icon: <CurrencyCircleDollar size={24} weight="regular" />,
    link: `${DEFAULT_PATH}/my-ads`,
  },

  {
    label: 'Novo Lote',
    icon: <DiceSix size={24} weight="regular" />,
    link: `${DEFAULT_PATH}/batches?modalOpen=true`,
  },

  {
    label: 'Meus Lotes',
    icon: <DiceTwo size={24} weight="regular" />,
    link: `${DEFAULT_PATH}/batches`,
  },

  {
    label: 'Galeria Premium',
    icon: <Star size={24} weight="regular" />,
    link: `${DEFAULT_PATH}/gallery-premium`,
  },

  {
    label: 'Configurações',
    icon: <Gear size={24} weight="regular" />,
    link: `${DEFAULT_PATH}/settings`,
  },
];
