import { getDefaultLanguageForCountry, resolveWebshopCountry } from '@/hooks/countryConfig';

describe('country config', () => {
  it('defaults to FI for missing/invalid values', () => {
    expect(resolveWebshopCountry(undefined)).toBe('FI');
    expect(resolveWebshopCountry('')).toBe('FI');
    expect(resolveWebshopCountry('de')).toBe('FI');
  });

  it('normalizes and resolves supported countries', () => {
    expect(resolveWebshopCountry('fi')).toBe('FI');
    expect(resolveWebshopCountry('SE')).toBe('SE');
    expect(resolveWebshopCountry(' se ')).toBe('SE');
  });

  it('maps country to default language', () => {
    expect(getDefaultLanguageForCountry('FI')).toBe('fi');
    expect(getDefaultLanguageForCountry('SE')).toBe('sv');
  });
});
