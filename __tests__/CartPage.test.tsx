import { CartPage } from '@/components/cart/CartPage';
import React from 'react';
import renderer from 'react-test-renderer';
import { Image } from 'react-native';
import { isDesktopWidth } from '@/components/cart/CartPage';

const mockCart = {
  items: [],
  totalPrice: 0,
  vatAmount: 0,
  incrementItem: jest.fn(),
  decrementItem: jest.fn(),
  removeItem: jest.fn(),
  clearCart: jest.fn(),
};
const mockI18n = { language: 'fi' };

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
      if (key === 'cart.orderSummaryTitle') return 'Tilausyhteenveto';
      if (key === 'cart.subtotalLabel') return 'Välisumma';
      if (key === 'cart.vatIncludedLabel') return 'ALV (sisältyy hintaan)';
      if (key === 'cart.deliveryLabel') return 'Toimitus';
      if (key === 'cart.deliveryValuePlaceholder') return 'Lasketaan kassalla';
      if (key === 'cart.totalLabelText') return 'Yhteensä';
      if (key === 'cart.totalWithoutVatLabel') return 'Yhteensä (ei ALV)';
      if (key === 'cart.checkoutButton') return 'Jatka kassalle';
      if (key === 'cart.summarySectionA11yLabel') return 'Tilausyhteenveto';
      if (key === 'cart.itemsSectionA11yLabel') return 'Tuotteet';
      if (key === 'cart.desktopLayoutA11yLabel') return 'Työpöytänäkymä';
      if (key === 'cart.mobileLayoutA11yLabel') return 'Mobiilinäkymä';
      if (key === 'cart.removeButton') return 'Remove';
      if (key === 'cart.clearButton') return 'Clear cart';
      if (key === 'cart.eanLabel') return `EAN: ${options?.ean}`;
      if (key === 'cart.priceLabel') return `Price: ${options?.price}`;
      if (key === 'category.priceUnavailable') return 'N/A';
      return key;
    },
    i18n: mockI18n,
  }),
}));

describe('CartPage', () => {
  beforeEach(() => {
    mockCart.items = [];
    mockCart.totalPrice = 0;
    mockCart.vatAmount = 0;
    mockI18n.language = 'fi';
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
    expect(textNodes.some((node) => node.props.children === 'Price: 1.50 €')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Tilausyhteenveto')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Välisumma')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'ALV (sisältyy hintaan)')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Toimitus')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Lasketaan kassalla')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Yhteensä')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Yhteensä (ei ALV)')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Jatka kassalle')).toBe(true);
    expect(textNodes.some((node) => node.props.children === '3.00 €')).toBe(true);
    expect(textNodes.some((node) => node.props.children === '0.77 €')).toBe(true);
    expect(textNodes.some((node) => node.props.children === '2.23 €')).toBe(true);
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

  it('renders SEK currency when locale is Swedish', () => {
    mockI18n.language = 'sv';
    mockCart.items = [
      { product: { id: 'p1', name: 'Apple', amount: 3, ean: '111', images: [], retailPrice: 1.5, tax: 0.255 }, quantity: 1 },
    ];
    mockCart.totalPrice = 1.5;
    mockCart.vatAmount = 0.38;

    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<CartPage />);
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Price: 1.50 SEK')).toBe(true);
    expect(textNodes.some((node) => node.props.children === '1.50 SEK')).toBe(true);
    expect(textNodes.some((node) => node.props.children === '0.38 SEK')).toBe(true);
    expect(textNodes.some((node) => node.props.children === '1.12 SEK')).toBe(true);
  });

  it('detects mobile vs desktop layout breakpoints', () => {
    expect(isDesktopWidth(390)).toBe(false);
    expect(isDesktopWidth(1200)).toBe(true);
  });
});
