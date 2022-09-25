import {
  House,
  ShoppingCart,
  CurrencyCircleDollar,
  Heart,
  Star,
  User,
  CreditCard,
  Gear,
  DiceSix,
  DiceTwo,
} from 'phosphor-react';

export const routes = [
  {
    label: 'Pagina Inicial',
    icon: <House size={24} weight="regular" />,
    link: '/home',
  },

  {
    label: 'Comprar',
    icon: <ShoppingCart size={24} weight="regular" />,
    link: '/buy-ads',
  },

  {
    label: 'Vender',
    icon: <CurrencyCircleDollar size={24} weight="regular" />,
    link: '/sell-ads',
  },

  {
    label: 'Novo Anúncio',
    icon: <DiceSix size={24} weight="regular" />,
    link: '/ads/new',
  },

  {
    label: 'Lotes',
    icon: <DiceTwo size={24} weight="regular" />,
    link: '/batchs',
  },

  {
    label: 'Galeria Premium',
    icon: <Star size={24} weight="regular" />,
    link: '/gallery-premium',
  },

  {
    label: 'Meu Perfil',
    icon: <User size={24} weight="regular" />,
    link: '/profile',
  },

  {
    label: 'Meus Favoritos',
    icon: <Heart size={24} weight="regular" />,
    link: '/my-favorites',
  },

  {
    label: 'Cartões',
    icon: <CreditCard size={24} weight="regular" />,
    link: '/cards',
  },

  {
    label: 'Configurações',
    icon: <Gear size={24} weight="regular" />,
    link: '/settings',
  },
];
