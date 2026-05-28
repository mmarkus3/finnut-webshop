import { filterProductsByQuery, normalizeSearchQuery } from '@/hooks/productSearch';
import { Product } from '@/types/product';

describe('productSearch helpers', () => {
  const products: Product[] = [
    {
      id: 'apple-1',
      name_fi: 'Green Apple',
      amount: 10,
      ean: '111',
      images: [],
      description_en: 'Fresh fruit',
      description_fi: 'Tuore hedelma',
    },
    {
      id: 'milk-1',
      name_fi: 'Whole Milk',
      amount: 4,
      ean: '222',
      images: [],
      description_sv: 'Mjolkprodukt',
    },
  ];

  it('normalizes query for matching', () => {
    expect(normalizeSearchQuery('  APPLE ')).toBe('apple');
  });

  it('filters by name, ean and description fields', () => {
    expect(filterProductsByQuery(products, 'milk').map((product) => product.id)).toEqual(['milk-1']);
    expect(filterProductsByQuery(products, '111').map((product) => product.id)).toEqual(['apple-1']);
    expect(filterProductsByQuery(products, 'tuore').map((product) => product.id)).toEqual(['apple-1']);
  });

  it('returns empty array for empty query', () => {
    expect(filterProductsByQuery(products, '   ')).toEqual([]);
  });
});
