import { CheckoutPage, getCheckoutSectionsLayoutClass, isDesktopWidth } from '@/components/checkout/CheckoutPage';
import React from 'react';
import renderer from 'react-test-renderer';

const mockFetchDeliveryPointsByPostalCode = jest.fn();

const mockCart = {
  items: [
    { product: { id: 'p1', name: 'Apple', amount: 5, ean: '111', images: [], retailPrice: 1.5 }, quantity: 2 },
  ],
  totalPrice: 3,
  vatAmount: 0.77,
};

jest.mock('@/hooks/cart', () => ({
  useCart: () => mockCart,
}));

jest.mock('@/hooks/deliveryPoints', () => ({
  fetchDeliveryPointsByPostalCode: (postalCode: string) => mockFetchDeliveryPointsByPostalCode(postalCode),
}));

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ orderId: 'order-1' }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, string | number>) => {
      if (key === 'checkout.title') return 'Checkout';
      if (key === 'checkout.customerInfoTitle') return 'Customer information';
      if (key === 'checkout.firstnameLabel') return 'First name';
      if (key === 'checkout.lastnameLabel') return 'Last name';
      if (key === 'checkout.emailLabel') return 'Email';
      if (key === 'checkout.addressStreetLabel') return 'Street address';
      if (key === 'checkout.addressCityLabel') return 'City';
      if (key === 'checkout.addressZipLabel') return 'ZIP code';
      if (key === 'checkout.deliveryPointsTitle') return 'Delivery points';
      if (key === 'checkout.loadDeliveryPointsButton') return 'Load delivery points';
      if (key === 'checkout.deliveryPointsLoading') return 'Loading delivery points...';
      if (key === 'checkout.deliveryPointsError') return 'Could not load delivery points. Please try again.';
      if (key === 'checkout.deliveryPointsEmpty') return 'No delivery points found.';
      if (key === 'checkout.deliveryPointOptionA11yLabel') return `Select delivery point ${options?.point}`;
      if (key === 'cart.orderSummaryTitle') return 'Order summary';
      if (key === 'cart.subtotalLabel') return 'Subtotal';
      if (key === 'cart.vatIncludedLabel') return 'VAT (included in price)';
      if (key === 'cart.totalWithoutVatLabel') return 'Total (excl. VAT)';
      if (key === 'cart.totalLabelText') return 'Total';
      if (key === 'category.priceUnavailable') return 'N/A';
      return key;
    },
    i18n: { language: 'en' },
  }),
}));

describe('CheckoutPage', () => {
  beforeEach(() => {
    mockFetchDeliveryPointsByPostalCode.mockReset();
    mockFetchDeliveryPointsByPostalCode.mockResolvedValue([]);
  });

  it('renders customer form and summary', () => {
    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<CheckoutPage />);
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Checkout')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Customer information')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Order summary')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Subtotal')).toBe(true);

    const inputs = tree!.root.findAllByType('TextInput');
    expect(inputs.length).toBe(6);
  });

  it('uses responsive layout helpers for desktop and mobile', () => {
    expect(isDesktopWidth(390)).toBe(false);
    expect(isDesktopWidth(1200)).toBe(true);
    expect(getCheckoutSectionsLayoutClass(false)).toContain('flex-col');
    expect(getCheckoutSectionsLayoutClass(true)).toContain('flex-row');
  });

  it('fetches delivery points by postal code and renders options', async () => {
    mockFetchDeliveryPointsByPostalCode.mockResolvedValue([
      { id: 'dp1', name: 'Point A', addressLine: 'Street 1, 00100, City' },
      { id: 'dp2', name: 'Point B', addressLine: 'Street 2, 00100, City' },
    ]);

    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<CheckoutPage />);
    });

    const inputs = tree!.root.findAllByType('TextInput');
    const postalCodeInput = inputs[5];
    renderer.act(() => {
      postalCodeInput.props.onChangeText('00100');
    });

    const loadButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Load delivery points'
    );

    await renderer.act(async () => {
      await loadButton.props.onPress();
    });

    expect(mockFetchDeliveryPointsByPostalCode).toHaveBeenCalledWith('00100');
    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Point A')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Point B')).toBe(true);
  });

  it('shows error state when delivery points fetch fails', async () => {
    mockFetchDeliveryPointsByPostalCode.mockRejectedValue(new Error('fail'));

    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<CheckoutPage />);
    });

    const inputs = tree!.root.findAllByType('TextInput');
    renderer.act(() => {
      inputs[5].props.onChangeText('00100');
    });

    const loadButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Load delivery points'
    );

    await renderer.act(async () => {
      await loadButton.props.onPress();
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Could not load delivery points. Please try again.')).toBe(true);
  });
});
