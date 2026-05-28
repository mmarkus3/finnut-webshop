import { filterProductsByCategory, getCategoryGridColumns, getCategoryPageTitle } from '@/components/category/CategoryProductGrid';
import { getAvailabilityStatusKey, getAvailabilityStatusMeta } from '@/components/product/availabilityStatus';
import {
  getFirstUsableProductImage,
  getProductDescription,
  getProductIdentifier,
  getProductPrice,
  getProductPriceDisplay,
  resolveProductByIdentifier,
} from '@/components/product/cardUtils';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('@/hooks/cart', () => ({
  useCart: () => ({
    addItem: jest.fn(),
    canAddItem: () => true,
  }),
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('expo-asset', () => ({
  Asset: {
    fromModule: () => ({ uri: 'placeholder://image' }),
  },
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, string | number>) => {
      if (key === 'category.loading') return 'Loading products...';
      if (key === 'category.productCount') return `${options?.count} products`;
      if (key === 'category.noProducts') return 'No products';
      if (key === 'category.productCardA11yLabel') return `Product card for ${options?.product}`;
      if (key === 'category.priceLabel') return `Price: ${options?.price}`;
      if (key === 'category.priceUnavailable') return 'N/A';
      if (key === 'product.lowestRetailPriceLast30DaysLabel') return 'Alin hinta edellisen 30 päivän aikana';
      if (key === 'availability.outOfStock') return 'Loppu varastosta';
      if (key === 'availability.lowStock') return 'Loppuu pian';
      if (key === 'availability.inStock') return 'Varastossa';
      if (key === 'cart.addButton') return 'Add to cart';
      if (key === 'cart.addA11yLabel') return `Add ${options?.product}`;
      return key;
    },
    i18n: { language: 'en' },
  }),
}));

describe('CategoryProductGrid helpers', () => {
  const categories: Category[] = [
    { id: 'fruits', name_en: 'Fruits', name_fi: 'Hedelmät', name_sv: 'Fruits', description: '' },
    { id: 'dairy', name_en: 'Dairy', name_fi: 'Maitotuotteet', name_sv: 'Mjölk products', description: '' },
  ];

  const products: Product[] = [
    {
      id: 'p-apple',
      name_fi: 'Omena',
      name_en: 'Apple',
      name_sv: 'Äpple',
      amount: 2,
      ean: '1',
      images: ['https://img/apple.jpg'],
      category: 'fruits',
      retailPrice: 1.99,
      discountPrice: 1.49,
      lowestRetailPriceLast30Days: 1.79,
      unitPrice: 2,
    },
    { name_en: 'Milk', name_sv: 'Mjölk', name_fi: 'Maito', amount: 5, ean: '2', images: [], category: 'dairy', unitPrice: 2.5, retailPrice: 2.5 },
  ];

  it('resolves category title and fallback', () => {
    expect(getCategoryPageTitle(categories, 'fruits', 'en')).toBe('Fruits');
    expect(getCategoryPageTitle(categories, 'unknown', 'fi')).toBe('unknown');
  });

  it('filters products by category', () => {
    expect(filterProductsByCategory(products, 'fruits').map((product) => product.name_en)).toEqual(['Apple']);
  });

  it('computes responsive column count', () => {
    expect(getCategoryGridColumns(375)).toBe(1);
    expect(getCategoryGridColumns(1280)).toBe(4);
  });

  it('resolves localized description fallback', () => {
    const product: Product = {
      name_en: 'Yogurt',
      name_fi: 'Jugurtti',
      name_sv: 'Yogurt',
      amount: 1,
      ean: '3',
      images: [],
      description_en: 'English desc',
      description_fi: 'Finnish desc',
      retailPrice: 3,
      unitPrice: 5,
    };

    expect(getProductDescription(product, 'en')).toBe('English desc');
    expect(getProductDescription(product, 'fi')).toBe('Finnish desc');
    expect(getProductDescription(product, 'sv')).toBe('Finnish desc');
  });

  it('resolves product price priority', () => {
    expect(getProductPrice(products[0])).toBe(1.49);
    expect(getProductPrice(products[1])).toBe(2.5);
    expect(getProductPrice({ ...products[1], retailPrice: undefined, unitPrice: undefined })).toBeNull();
  });

  it('derives discount display model and 30-day lowest price visibility', () => {
    const discounted = getProductPriceDisplay(products[0]);
    expect(discounted.hasDiscount).toBe(true);
    expect(discounted.discountPrice).toBe(1.49);
    expect(discounted.retailPrice).toBe(1.99);
    expect(discounted.lowestRetailPriceLast30Days).toBe(1.79);

    const regular = getProductPriceDisplay(products[1]);
    expect(regular.hasDiscount).toBe(false);
    expect(regular.discountPrice).toBeNull();
    expect(regular.retailPrice).toBe(2.5);
    expect(regular.lowestRetailPriceLast30Days).toBeNull();
  });

  it('returns first image and fallback null for unusable images', () => {
    expect(getFirstUsableProductImage(products[0])).toBe('https://img/apple.jpg');
    expect(getFirstUsableProductImage(products[1])).toBeNull();
    expect(getFirstUsableProductImage({ ...products[0], images: ['   '] })).toBeNull();
  });

  it('resolves product identifiers for navigation', () => {
    expect(getProductIdentifier(products[0])).toBe('p-apple');
    expect(getProductIdentifier(products[1])).toBe('2');
    expect(resolveProductByIdentifier(products, 'p-apple')?.name_en).toBe('Apple');
    expect(resolveProductByIdentifier(products, 'missing')).toBeNull();
  });

  it('maps availability thresholds to status and color classes', () => {
    expect(getAvailabilityStatusKey(0)).toBe('outOfStock');
    expect(getAvailabilityStatusKey(9)).toBe('lowStock');
    expect(getAvailabilityStatusKey(10)).toBe('inStock');

    expect(getAvailabilityStatusMeta(0).bgClassName).toBe('bg-red-100');
    expect(getAvailabilityStatusMeta(5).bgClassName).toBe('bg-yellow-100');
    expect(getAvailabilityStatusMeta(20).bgClassName).toBe('bg-green-100');
  });

  it('uses truncated description text in grid cards', () => {
    const { CategoryProductGrid } = require('@/components/category/CategoryProductGrid');
    const categories: Category[] = [{ id: 'fruits', name: 'Fruits', description: '' }];
    const products: Product[] = [
      { id: 'p-apple', name: 'Apple', amount: 2, ean: '1', images: ['https://img/apple.jpg'], category: 'fruits', retailPrice: 1.99 },
    ];

    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(
        <CategoryProductGrid categories={categories} categoryId="fruits" products={products} isLoading={false} />
      );
    });

    const truncatedDescriptionNodes = tree!.root.findAll(
      (node) => node.type === 'Text' && node.props.numberOfLines === 3
    );
    expect(truncatedDescriptionNodes.length).toBeGreaterThan(0);
  });
});
