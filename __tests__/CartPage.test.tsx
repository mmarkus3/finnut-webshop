import { CartPage } from '@/components/cart/CartPage';
import React from 'react';
import renderer from 'react-test-renderer';
import { Image } from 'react-native';

const mockCart = {
  items: [],
  totalPrice: 0,
  vatAmount: 0,
  incrementItem: jest.fn(),
  decrementItem: jest.fn(),
  removeItem: jest.fn(),
  clearCart: jest.fn(),
};

jest.mock('@/hooks/cart', () => ({
  useCart: () => mockCart,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, string | number>) => {
      if (key === 'cart.title') return 'Shopping cart';
      if (key === 'cart.empty') return 'Your cart is empty.';
      if (key === 'cart.totalLabel') return `Total: ${options?.total}`;
      if (key === 'cart.vatLabel') return `VAT: ${options?.vat}`;
      if (key === 'cart.removeButton') return 'Remove';
      if (key === 'cart.clearButton') return 'Clear cart';
      if (key === 'cart.eanLabel') return `EAN: ${options?.ean}`;
      if (key === 'cart.priceLabel') return `Price: ${options?.price}`;
      if (key === 'category.priceUnavailable') return 'N/A';
      return key;
    },
  }),
}));

describe('CartPage', () => {
  beforeEach(() => {
    mockCart.items = [];
    mockCart.totalPrice = 0;
    mockCart.vatAmount = 0;
  });

  it('renders empty state', () => {
    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<CartPage />);
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Your cart is empty.')).toBe(true);
  });

  it('renders line items and total', () => {
    mockCart.items = [
      { product: { id: 'p1', name: 'Apple', amount: 3, ean: '111', images: [], retailPrice: 1.5, tax: 0.255 }, quantity: 2 },
    ];
    mockCart.totalPrice = 3;
    mockCart.vatAmount = 0.77;

    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<CartPage />);
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Apple')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'VAT: 0.77')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Total: 3.00')).toBe(true);
  });

  it('uses fallback image when product has no usable image', () => {
    mockCart.items = [
      { product: { id: 'p1', name: 'Apple', amount: 3, ean: '111', images: ['   '], retailPrice: 1.5, tax: 0.255 }, quantity: 1 },
    ];

    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<CartPage />);
    });

    const imageNodes = tree!.root.findAllByType(Image);
    expect(imageNodes.length).toBeGreaterThan(0);
    expect(imageNodes[0].props.source).toBeDefined();
    expect(imageNodes[0].props.defaultSource).toBeDefined();
  });
});
