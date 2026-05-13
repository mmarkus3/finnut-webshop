import { isDesktopWidth } from '@/components/product/ProductDetailPage';
import { Product } from '@/types/product';
import { resolveProductByIdentifier } from '@/components/product/cardUtils';

describe('ProductDetailPage helpers', () => {
  it('detects desktop and mobile breakpoints', () => {
    expect(isDesktopWidth(375)).toBe(false);
    expect(isDesktopWidth(1280)).toBe(true);
  });

  it('resolves selected product by route identifier', () => {
    const products: Product[] = [
      { id: 'p1', name: 'Apple', amount: 1, ean: 'ean-1', images: [] },
      { name: 'Milk', amount: 2, ean: 'ean-2', images: [] },
    ];

    expect(resolveProductByIdentifier(products, 'p1')?.name).toBe('Apple');
    expect(resolveProductByIdentifier(products, 'ean-2')?.name).toBe('Milk');
    expect(resolveProductByIdentifier(products, 'unknown')).toBeNull();
  });
});
