import { filterProductsByCategory, getCategoryGridColumns, getCategoryPageTitle } from '@/components/category/CategoryProductGrid';
import { getFirstUsableProductImage, getProductDescription, getProductPrice } from '@/components/product/cardUtils';
import { Category } from '@/types/category';
import { Product } from '@/types/product';

describe('CategoryProductGrid helpers', () => {
  const categories: Category[] = [
    { id: 'fruits', name: 'Fruits', description: '' },
    { id: 'dairy', name: 'Dairy', description: '' },
  ];

  const products: Product[] = [
    { name: 'Apple', amount: 2, ean: '1', images: ['https://img/apple.jpg'], category: 'fruits', retailPrice: 1.99 },
    { name: 'Milk', amount: 5, ean: '2', images: [], category: 'dairy', unitPrice: 2.5 },
  ];

  it('resolves category title and fallback', () => {
    expect(getCategoryPageTitle(categories, 'fruits')).toBe('Fruits');
    expect(getCategoryPageTitle(categories, 'unknown')).toBe('unknown');
  });

  it('filters products by category', () => {
    expect(filterProductsByCategory(products, 'fruits').map((product) => product.name)).toEqual(['Apple']);
  });

  it('computes responsive column count', () => {
    expect(getCategoryGridColumns(375)).toBe(1);
    expect(getCategoryGridColumns(1280)).toBe(4);
  });

  it('resolves localized description fallback', () => {
    const product: Product = {
      name: 'Yogurt',
      amount: 1,
      ean: '3',
      images: [],
      description_en: 'English desc',
      description_fi: 'Finnish desc',
    };

    expect(getProductDescription(product, 'en')).toBe('English desc');
    expect(getProductDescription(product, 'fi')).toBe('Finnish desc');
    expect(getProductDescription(product, 'sv')).toBe('Finnish desc');
  });

  it('resolves product price priority', () => {
    expect(getProductPrice(products[0])).toBe(1.99);
    expect(getProductPrice(products[1])).toBe(2.5);
    expect(getProductPrice({ ...products[1], retailPrice: undefined, unitPrice: undefined })).toBeNull();
  });

  it('returns first image and fallback null for unusable images', () => {
    expect(getFirstUsableProductImage(products[0])).toBe('https://img/apple.jpg');
    expect(getFirstUsableProductImage(products[1])).toBeNull();
    expect(getFirstUsableProductImage({ ...products[0], images: ['   '] })).toBeNull();
  });
});
