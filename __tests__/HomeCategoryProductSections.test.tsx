import React from 'react';
import renderer from 'react-test-renderer';
import { HomeCategoryProductSections, getFirstProductImage, groupProductsByCategory } from '@/components/home/HomeCategoryProductSections';
import { Category } from '@/types/category';
import { Product } from '@/types/product';

jest.mock('expo-asset', () => ({
  Asset: {
    fromModule: () => ({ uri: 'placeholder://image' }),
  },
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, string>) => {
      if (key === 'home.noCategoryProducts') {
        return 'No products found for categories yet.';
      }

      if (key === 'home.categoryCarouselA11yLabel') {
        return `Product carousel for ${options?.category ?? ''}`;
      }

      if (key === 'home.productCardA11yLabel') {
        return `View product ${options?.product ?? ''}`;
      }

      if (key.startsWith('categories.')) {
        return options?.defaultValue ?? key;
      }

      return key;
    },
  }),
}));

describe('HomeCategoryProductSections helpers', () => {
  const categories: Category[] = [
    { id: 'fruit', name: 'Fruit', description: '' },
    { id: 'dairy', name: 'Dairy', description: '' },
    { id: 'bakery', name: 'Bakery', description: '' },
  ];

  const products: Product[] = [
    { name: 'Apple', amount: 1, ean: '1', images: ['https://img/apple.jpg'], category: 'fruit' },
    { name: 'Milk', amount: 1, ean: '2', images: ['https://img/milk.jpg'], category: 'dairy' },
    { name: 'Orphan', amount: 1, ean: '3', images: ['https://img/orphan.jpg'], category: 'unknown' },
  ];

  it('returns first image when available', () => {
    expect(getFirstProductImage(products[0])).toBe('https://img/apple.jpg');
  });

  it('returns null when image list is empty', () => {
    expect(getFirstProductImage({ ...products[0], images: [] })).toBeNull();
  });

  it('groups products by existing category in stable category order and skips empty sections', () => {
    const grouped = groupProductsByCategory(categories, products);

    expect(grouped).toHaveLength(2);
    expect(grouped[0].category.id).toBe('fruit');
    expect(grouped[0].products.map((product) => product.name)).toEqual(['Apple']);
    expect(grouped[1].category.id).toBe('dairy');
    expect(grouped[1].products.map((product) => product.name)).toEqual(['Milk']);
  });
});

describe('HomeCategoryProductSections rendering', () => {
  const categories: Category[] = [
    { id: 'fruit', name: 'Fruit', description: '' },
    { id: 'dairy', name: 'Dairy', description: '' },
  ];

  const products: Product[] = [
    { name: 'Apple', amount: 1, ean: '1', images: ['https://img/apple.jpg'], category: 'fruit' },
    { name: 'Milk', amount: 1, ean: '2', images: [], category: 'dairy' },
  ];

  it('renders no-data message when no category sections can be produced', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<HomeCategoryProductSections categories={categories} products={[]} />);
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'No products found for categories yet.')).toBe(true);
  });

  it('renders a carousel per category section and uses placeholder for products without images', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<HomeCategoryProductSections categories={categories} products={products} />);
    });

    const carouselLabels = Array.from(
      new Set(
        tree!.root
          .findAll((node) => typeof node.props.accessibilityLabel === 'string')
          .map((node) => node.props.accessibilityLabel as string)
          .filter((label) => label.startsWith('Product carousel for '))
      )
    );
    expect(carouselLabels).toEqual(['Product carousel for Fruit', 'Product carousel for Dairy']);

    const cards = tree!.root.findAll((node) => node.type === 'View' && node.props.accessibilityRole === 'button');
    expect(cards).toHaveLength(2);

    const imageUris = tree!.root
      .findAll((node) => node.props.source !== undefined)
      .map((node) => node.props.source?.uri)
      .filter(Boolean);
    expect(imageUris).toContain('https://img/apple.jpg');
    expect(imageUris).toContain('placeholder://image');

    expect(cards[0].props.accessibilityLabel).toBe('View product Apple');
  });
});
