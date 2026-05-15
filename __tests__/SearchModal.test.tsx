import { SEARCH_PREVIEW_LIMIT, canSubmitSearchQuery, getModalPreviewProducts } from '@/components/search/SearchModal';
import { Product } from '@/types/product';

describe('SearchModal helpers', () => {
  const products: Product[] = [
    { id: 'p1', name: 'Apple', amount: 1, ean: '100', images: [] },
    { id: 'p2', name: 'Milk', amount: 1, ean: '200', images: [] },
    { id: 'p3', name: 'Banana', amount: 1, ean: '300', images: [] },
    { id: 'p4', name: 'Apple Juice', amount: 1, ean: '400', images: [] },
    { id: 'p5', name: 'Apple Pie', amount: 1, ean: '500', images: [] },
    { id: 'p6', name: 'Apple Jam', amount: 1, ean: '600', images: [] },
    { id: 'p7', name: 'Apple Soda', amount: 1, ean: '700', images: [] },
  ];

  it('returns bounded preview results for query', () => {
    const result = getModalPreviewProducts(products, 'apple');
    expect(result.length).toBeLessThanOrEqual(SEARCH_PREVIEW_LIMIT);
    expect(result.every((product) => product.name.toLowerCase().includes('apple'))).toBe(true);
  });

  it('returns empty preview for empty query', () => {
    expect(getModalPreviewProducts(products, '   ')).toEqual([]);
  });

  it('validates whether query can be submitted', () => {
    expect(canSubmitSearchQuery(' apple ')).toBe(true);
    expect(canSubmitSearchQuery('   ')).toBe(false);
  });
});
