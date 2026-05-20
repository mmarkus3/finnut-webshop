export type WebshopCountry = 'FI' | 'SE';

const SUPPORTED_COUNTRIES: WebshopCountry[] = ['FI', 'SE'];

const normalizeCountry = (value: string | undefined): string => (value ?? '').trim().toUpperCase();

const resolveWebshopCountry = (rawValue: string | undefined = process.env.EXPO_PUBLIC_COUNTRY): WebshopCountry => {
  const normalized = normalizeCountry(rawValue);
  return SUPPORTED_COUNTRIES.includes(normalized as WebshopCountry) ? (normalized as WebshopCountry) : 'FI';
};

const getDefaultLanguageForCountry = (country: WebshopCountry): 'fi' | 'sv' => {
  return country === 'SE' ? 'sv' : 'fi';
};

export {
  getDefaultLanguageForCountry,
  normalizeCountry,
  resolveWebshopCountry,
  SUPPORTED_COUNTRIES,
};
