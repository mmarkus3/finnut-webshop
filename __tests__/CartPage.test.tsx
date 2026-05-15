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
const mockPush = jest.fn();
const mockGetActiveOrderId = jest.fn(() => null);
const mockSaveActiveOrderId = jest.fn();
const mockClearActiveOrderId = jest.fn();
const mockSyncOrderForCheckout = jest.fn();

jest.mock('@/hooks/cart', () => ({
  useCart: () => mockCart,
}));

jest.mock('@/hooks/activeOrder', () => ({
  getActiveOrderId: () => mockGetActiveOrderId(),
  saveActiveOrderId: (id: string) => mockSaveActiveOrderId(id),
  clearActiveOrderId: () => mockClearActiveOrderId(),
}));

jest.mock('@/hooks/checkoutOrder', () => ({
  syncOrderForCheckout: (items: unknown[], activeOrderId: string | null) => mockSyncOrderForCheckout(items, activeOrderId),
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
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
    mockPush.mockReset();
    mockGetActiveOrderId.mockReset();
    mockGetActiveOrderId.mockReturnValue(null);
    mockSaveActiveOrderId.mockReset();
    mockClearActiveOrderId.mockReset();
    mockSyncOrderForCheckout.mockReset();
    mockSyncOrderForCheckout.mockResolvedValue({ id: 'order-created' });
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
    const hasVismaBanner = imageNodes.some((node) => node.props.source?.uri === 'https://static.vismapay.com/pay_banners/row.png');
    expect(hasVismaBanner).toBe(true);
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

  it('reuses stored active order id when proceeding to checkout', () => {
    mockCart.items = [
      { product: { id: 'p1', name: 'Apple', amount: 3, ean: '111', images: [], retailPrice: 1.5, tax: 0.255 }, quantity: 1 },
    ];
    mockGetActiveOrderId.mockReturnValue('order-123');

    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<CartPage />);
    });

    const checkoutButton = tree!.root.find(
      (node) =>
        typeof node.props.onPress === 'function' &&
        node.props.accessibilityLabel === 'Jatka kassalle'
    );

    return renderer.act(async () => {
      await checkoutButton.props.onPress();
    });

  });

  it('updates active order then navigates with existing id', async () => {
    mockCart.items = [
      { product: { id: 'p1', name: 'Apple', amount: 3, ean: '111', images: [], retailPrice: 1.5, tax: 0.255 }, quantity: 1 },
    ];
    mockGetActiveOrderId.mockReturnValue('order-123');
    mockSyncOrderForCheckout.mockResolvedValue({ id: 'order-123' });

    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<CartPage />);
    });

    const checkoutButton = tree!.root.find(
      (node) =>
        typeof node.props.onPress === 'function' &&
        node.props.accessibilityLabel === 'Jatka kassalle'
    );

    await renderer.act(async () => {
      await checkoutButton.props.onPress();
    });

    expect(mockSyncOrderForCheckout).toHaveBeenCalledWith(mockCart.items, 'order-123');
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/checkout',
      params: { orderId: 'order-123' },
    });
  });

  it('creates order, saves id, and navigates with created id when no stored id exists', async () => {
    mockCart.items = [
      { product: { id: 'p1', name: 'Apple', amount: 3, ean: '111', images: [], retailPrice: 1.5, tax: 0.255 }, quantity: 1 },
    ];
    mockGetActiveOrderId.mockReturnValue(null);
    mockSyncOrderForCheckout.mockResolvedValue({ id: 'new-order-1' });

    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<CartPage />);
    });

    const checkoutButton = tree!.root.find(
      (node) =>
        typeof node.props.onPress === 'function' &&
        node.props.accessibilityLabel === 'Jatka kassalle'
    );

    await renderer.act(async () => {
      await checkoutButton.props.onPress();
    });

    expect(mockSyncOrderForCheckout).toHaveBeenCalledWith(mockCart.items, null);
    expect(mockSaveActiveOrderId).toHaveBeenCalledWith('new-order-1');
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/checkout',
      params: { orderId: 'new-order-1' },
    });
  });

  it('shows error and blocks navigation when order sync fails', async () => {
    mockCart.items = [
      { product: { id: 'p1', name: 'Apple', amount: 3, ean: '111', images: [], retailPrice: 1.5, tax: 0.255 }, quantity: 1 },
    ];
    mockGetActiveOrderId.mockReturnValue('order-123');
    mockSyncOrderForCheckout.mockRejectedValue(new Error('sync failed'));

    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<CartPage />);
    });

    const checkoutButton = tree!.root.find(
      (node) =>
        typeof node.props.onPress === 'function' &&
        node.props.accessibilityLabel === 'Jatka kassalle'
    );

    await renderer.act(async () => {
      await checkoutButton.props.onPress();
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'checkout.orderCreateError')).toBe(true);
    expect(mockPush).not.toHaveBeenCalled();
  });
});
