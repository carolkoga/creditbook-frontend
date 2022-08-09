interface Options {
  country: string,
  symbol: string
}

export default function convertToCurrency(amount: number, options?: Options) {
  return new Intl.NumberFormat(
    options?.country ?? 'pt-BR',
    {
      style: 'currency',
      currency: options?.symbol ?? 'BRL',
    },
  ).format(amount);
}
