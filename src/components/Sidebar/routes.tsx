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
    label: 'Comprar',
    icon: <ShoppingCart size={24} weight="regular" />,
    link: '/ads',
  },

  {
    label: 'Favoritos',
    icon: <Heart size={24} weight="regular" />,
    link: `${DEFAULT_PATH}/my-favorites`,
  },

  {
    label: 'Novo Anúncio',
    icon: <DiceSix size={24} weight="regular" />,
    link: `${DEFAULT_PATH}/ads/new`,
  },

  {
    label: 'Meus Anúncios',
    icon: <CurrencyCircleDollar size={24} weight="regular" />,
    link: `${DEFAULT_PATH}/my-ads`,
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
