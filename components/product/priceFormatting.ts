const getCurrencyMarkerForLocale = (language: string): '€' | 'SEK' => {
  if (language.toLowerCase().startsWith('sv')) {
    return 'SEK';
  }

  return '€';
};

const formatPriceWithCurrency = (price: number, language: string, fixed = 2): string => {
  const currencyMarker = getCurrencyMarkerForLocale(language);
  return `${price.toFixed(fixed)} ${currencyMarker}`;
};

export { formatPriceWithCurrency, getCurrencyMarkerForLocale };
