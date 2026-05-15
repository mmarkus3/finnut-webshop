const getCurrencyMarkerForLocale = (language: string): '€' | 'SEK' => {
  if (language.toLowerCase().startsWith('sv')) {
    return 'SEK';
  }

  return '€';
};

const formatPriceWithCurrency = (price: number, language: string): string => {
  const currencyMarker = getCurrencyMarkerForLocale(language);
  return `${price.toFixed(2)} ${currencyMarker}`;
};

export { formatPriceWithCurrency, getCurrencyMarkerForLocale };
