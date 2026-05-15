import React from 'react';
import renderer from 'react-test-renderer';
import { HomeCategoryProductSections, groupProductsByCategory } from '@/components/home/HomeCategoryProductSections';
import { getFirstUsableProductImage, getProductDescription, getProductPrice } from '@/components/product/cardUtils';
import { Category } from '@/types/category';
import { Product } from '@/types/product';

const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('expo-asset', () => ({
  Asset: {
    fromModule: () => ({ uri: 'placeholder://image' }),
  },
}));

jest.mock('@/hooks/cart', () => ({
  useCart: () => ({
    addItem: jest.fn(),
    canAddItem: () => true,
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, string | number>) => {
      if (key === 'home.noCategoryProducts') return 'No products found for categories yet.';
      if (key === 'home.categoryCarouselA11yLabel') return `Product carousel for ${options?.category ?? ''}`;
      if (key === 'home.productCardA11yLabel') return `View product ${options?.product ?? ''}`;
      if (key === 'cart.addButton') return 'Add to cart';
      if (key === 'cart.addA11yLabel') return `Add ${options?.product ?? ''} to cart`;
      if (key === 'category.priceLabel') return `Price: ${options?.price}`;
      if (key === 'category.priceUnavailable') return 'N/A';
      if (key === 'category.availabilityLabel') return `Availability: ${options?.amount}`;
      if (key === 'category.descriptionUnavailable') return 'No description available.';
      if (key.startsWith('categories.')) return options?.defaultValue ?? key;
      return key;
    },
    i18n: { language: 'en' },
  }),
}));

describe('HomeCategoryProductSections helpers', () => {
  const categories: Category[] = [
    { id: 'fruit', name: 'Fruit', description: '' },
    { id: 'dairy', name: 'Dairy', description: '' },
    { id: 'bakery', name: 'Bakery', description: '' },
  ];

  const products: Product[] = [
    {
      id: 'p-apple',
      name: 'Apple',
      amount: 1,
      ean: '1',
      images: ['https://img/apple.jpg'],
      category: 'fruit',
      retailPrice: 2.35,
      description_en: 'Fresh apple description',
    },
    {
      name: 'Milk',
      amount: 1,
      ean: '2',
      images: ['https://img/milk.jpg'],
      category: 'dairy',
      unitPrice: 3.6,
      description_en: 'Milk description',
    },
    { name: 'Orphan', amount: 1, ean: '3', images: ['https://img/orphan.jpg'], category: 'unknown' },
  ];

  it('returns first image when available', () => {
    expect(getFirstUsableProductImage(products[0])).toBe('https://img/apple.jpg');
  });

  it('returns null when image list is empty', () => {
    expect(getFirstUsableProductImage({ ...products[0], images: [] })).toBeNull();
  });

  it('derives shared metadata helpers', () => {
    expect(getProductPrice(products[0])).toBe(2.35);
    expect(getProductPrice(products[1])).toBe(3.6);
    expect(getProductDescription(products[0], 'en')).toBe('Fresh apple description');
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
    {
      id: 'p-apple',
      name: 'Apple',
      amount: 1,
      ean: '1',
      images: ['https://img/apple.jpg'],
      category: 'fruit',
      retailPrice: 4.2,
      description_en: 'Apple home card description',
    },
    { name: 'Milk', amount: 3, ean: '2', images: [], category: 'dairy' },
  ];

  beforeEach(() => {
    mockPush.mockReset();
  });

  it('renders no-data message when no category sections can be produced', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<HomeCategoryProductSections categories={categories} products={[]} />);
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'No products found for categories yet.')).toBe(true);
  });

  it('renders carousel cards with parity metadata and image fallback', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<HomeCategoryProductSections categories={categories} products={products} />);
    });

    const cardLabels = Array.from(
      new Set(
        tree!.root
          .findAll((node) => typeof node.props.accessibilityLabel === 'string')
          .map((node) => node.props.accessibilityLabel as string)
          .filter((label) => label.startsWith('View product '))
      )
    );
    expect(cardLabels).toEqual(['View product Apple', 'View product Milk']);

    const imageUris = tree!.root
      .findAll((node) => node.props.source !== undefined)
      .map((node) => node.props.source?.uri)
      .filter(Boolean);
    expect(imageUris).toContain('https://img/apple.jpg');
    expect(imageUris).toContain('placeholder://image');

    const textValues = tree!.root
      .findAllByType('Text')
      .map((node) => node.props.children)
      .flat();

    expect(textValues).toContain('Price: 4.20');
    expect(textValues).toContain('Availability: 1');
    expect(textValues).toContain('Apple home card description');

    const truncatedDescriptionNodes = tree!.root.findAll(
      (node) => node.type === 'Text' && node.props.numberOfLines === 3
    );
    expect(truncatedDescriptionNodes.length).toBeGreaterThan(0);
  });

  it('navigates to product detail route when pressing card', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<HomeCategoryProductSections categories={categories} products={products} />);
    });

    const cards = tree!.root.findAll(
      (node) =>
        typeof node.props.onPress === 'function' &&
        typeof node.props.accessibilityLabel === 'string' &&
        node.props.accessibilityLabel.startsWith('View product ')
    );

    renderer.act(() => {
      cards[0].props.onPress();
    });

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/product/[productId]',
      params: { productId: 'p-apple' },
    });
  });
});
