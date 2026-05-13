import {
  filterProductsByCategory,
  getCategoryGridColumns,
  getCategoryPageTitle,
  getProductDescription,
  getProductPrice,
} from '@/components/category/CategoryProductGrid';
import { Category } from '@/types/category';
import { Product } from '@/types/product';

describe('CategoryProductGrid helpers', () => {
  const categories: Category[] = [
    { id: 'fruits', name: 'Fruits', description: '' },
    { id: 'dairy', name: 'Dairy', description: '' },
  ];

  const products: Product[] = [
    { name: 'Apple', amount: 2, ean: '1', images: [], category: 'fruits', retailPrice: 1.99 },
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

  it('derives required product metadata fields for card content', () => {
    const product: Product = {
      name: 'Apple',
      amount: 7,
      ean: '1',
      images: [],
      retailPrice: 3.5,
      description_en: 'Long description for apples',
    };

    expect(product.name).toBe('Apple');
    expect(getProductPrice(product)?.toFixed(2)).toBe('3.50');
    expect(product.amount).toBe(7);
    expect(getProductDescription(product, 'en')).toBe('Long description for apples');
  });
});
