import { formatPriceWithCurrency, getCurrencyMarkerForLocale } from '@/components/product/priceFormatting';

describe('price formatting', () => {
  it('uses euro for Finnish locale', () => {
    expect(getCurrencyMarkerForLocale('fi')).toBe('€');
    expect(getCurrencyMarkerForLocale('fi-FI')).toBe('€');
    expect(formatPriceWithCurrency(12.5, 'fi')).toBe('12.50 €');
  });

  it('uses SEK for Swedish locale', () => {
    expect(getCurrencyMarkerForLocale('sv')).toBe('SEK');
    expect(getCurrencyMarkerForLocale('sv-SE')).toBe('SEK');
    expect(formatPriceWithCurrency(12.5, 'sv')).toBe('12.50 SEK');
  });

  it('falls back to euro for unsupported locales', () => {
    expect(getCurrencyMarkerForLocale('en')).toBe('€');
    expect(formatPriceWithCurrency(1, 'en')).toBe('1.00 €');
  });
});
