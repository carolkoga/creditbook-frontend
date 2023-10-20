export function mapperCurrency(currency: string | number) {
  const cleanCurrency = String(currency).replace(/[^0-9,]/g, '');
  const currencyParsed = Number(cleanCurrency.replace(',', '.'));

  console.log(currencyParsed);

  return currencyParsed;
}
