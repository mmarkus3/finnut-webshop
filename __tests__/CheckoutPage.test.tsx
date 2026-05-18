import { CheckoutPage, getCheckoutSectionsLayoutClass, isDesktopWidth } from '@/components/checkout/CheckoutPage';
import React from 'react';
import renderer from 'react-test-renderer';

const mockFetchDeliveryPointsByPostalCode = jest.fn();
const mockSaveDeliveryMethodToOrder = jest.fn();
const mockFetchPaymentMethods = jest.fn();

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

jest.mock('@/hooks/deliveryPricing', () => ({
  useDeliveryPricing: () => ({ pricing: { over: 100, delivery: 7.9 }, isLoading: false, error: null }),
  getDeliveryCost: (cartTotal: number, pricing: { over: number; delivery: number } | null) => {
    if (!pricing) {
      return { isFree: false, cost: null, over: null };
    }
    if (cartTotal >= pricing.over) {
      return { isFree: true, cost: 0, over: pricing.over };
    }
    return { isFree: false, cost: pricing.delivery, over: pricing.over };
  },
}));

jest.mock('@/hooks/deliveryPoints', () => ({
  fetchDeliveryPointsByPostalCode: (postalCode: string) => mockFetchDeliveryPointsByPostalCode(postalCode),
}));

jest.mock('@/hooks/paymentMethods', () => ({
  fetchPaymentMethods: () => mockFetchPaymentMethods(),
}));

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ orderId: 'order-1' }),
}));

jest.mock('@/hooks/deliveryMethodPersistence', () => ({
  saveDeliveryMethodToOrder: (orderId: string, deliveryMethodId: string) =>
    mockSaveDeliveryMethodToOrder(orderId, deliveryMethodId),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, string | number>) => {
      if (key === 'checkout.title') return 'Checkout';
      if (key === 'checkout.customerInfoTitle') return 'Customer information';
      if (key === 'checkout.firstnameLabel') return 'First name';
      if (key === 'checkout.lastnameLabel') return 'Last name';
      if (key === 'checkout.emailLabel') return 'Email';
      if (key === 'checkout.phoneLabel') return 'Phone number';
      if (key === 'checkout.addressStreetLabel') return 'Street address';
      if (key === 'checkout.addressCityLabel') return 'City';
      if (key === 'checkout.addressZipLabel') return 'ZIP code';
      if (key === 'checkout.deliveryPointsTitle') return 'Delivery points';
      if (key === 'checkout.loadDeliveryPointsButton') return 'Load delivery points';
      if (key === 'checkout.deliveryPointsLoading') return 'Loading delivery points...';
      if (key === 'checkout.deliveryPointsError') return 'Could not load delivery points. Please try again.';
      if (key === 'checkout.deliveryPointsEmpty') return 'No delivery points found.';
      if (key === 'checkout.deliveryPointOptionA11yLabel') return `Select delivery point ${options?.point}`;
      if (key === 'checkout.deliveryMethodSaving') return 'Saving delivery method...';
      if (key === 'checkout.deliveryMethodSaveError') return 'Could not save delivery method. Please try again.';
      if (key === 'checkout.nextToPaymentButton') return 'Continue to payment methods';
      if (key === 'checkout.paymentMethodsTitle') return 'Payment methods';
      if (key === 'checkout.paymentMethodsLoading') return 'Loading payment methods...';
      if (key === 'checkout.paymentMethodsError') return 'Could not load payment methods. Please try again.';
      if (key === 'checkout.paymentMethodsEmpty') return 'No payment methods available.';
      if (key === 'checkout.paymentMethodOptionA11yLabel') return `Select payment method ${options?.method}`;
      if (key === 'cart.orderSummaryTitle') return 'Order summary';
      if (key === 'cart.subtotalLabel') return 'Subtotal';
      if (key === 'cart.vatIncludedLabel') return 'VAT (included in price)';
      if (key === 'cart.totalWithoutVatLabel') return 'Total (excl. VAT)';
      if (key === 'cart.totalLabelText') return 'Total';
      if (key === 'cart.deliveryLabel') return 'Delivery';
      if (key === 'delivery.free') return 'Free';
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
    mockSaveDeliveryMethodToOrder.mockReset();
    mockSaveDeliveryMethodToOrder.mockResolvedValue(undefined);
    mockFetchPaymentMethods.mockReset();
    mockFetchPaymentMethods.mockResolvedValue([]);
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
    expect(textNodes.some((node) => node.props.children === 'Delivery')).toBe(true);
    expect(textNodes.some((node) => node.props.children === '7.90 €')).toBe(true);

    const inputs = tree!.root.findAllByType('TextInput');
    expect(inputs.length).toBe(7);
    expect(inputs.some((input) => input.props.placeholder === 'Phone number')).toBe(true);
  });

  it('uses responsive layout helpers for desktop and mobile', () => {
    expect(isDesktopWidth(390)).toBe(false);
    expect(isDesktopWidth(1200)).toBe(true);
    expect(getCheckoutSectionsLayoutClass(false)).toContain('flex-col');
    expect(getCheckoutSectionsLayoutClass(true)).toContain('flex-row');
  });

  it('keeps next-to-payment disabled until required customer and delivery data are complete', async () => {
    mockFetchDeliveryPointsByPostalCode.mockResolvedValue([
      { id: 'dp1', name: 'Point A', addressLine: 'Street 1, 00100, City' },
    ]);

    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<CheckoutPage />);
    });

    const nextButton = () =>
      tree!.root.find(
        (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Continue to payment methods'
      );

    expect(nextButton().props.disabled).toBe(true);

    const setInput = (placeholder: string, value: string) => {
      const input = tree!.root.find((node) => node.type === 'TextInput' && node.props.placeholder === placeholder);
      renderer.act(() => {
        input.props.onChangeText(value);
      });
    };

    setInput('First name', 'John');
    setInput('Last name', 'Doe');
    setInput('Email', 'john@example.com');
    setInput('Phone number', '+358401234567');
    setInput('Street address', 'Main street 1');
    setInput('City', 'Helsinki');
    setInput('ZIP code', '00100');

    const loadButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Load delivery points'
    );

    await renderer.act(async () => {
      await loadButton.props.onPress();
    });

    const pointButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Select delivery point Point A'
    );

    await renderer.act(async () => {
      await pointButton.props.onPress();
    });

    expect(nextButton().props.disabled).toBe(false);
  });

  it('navigates to payment step and loads payment methods while keeping summary visible', async () => {
    mockFetchDeliveryPointsByPostalCode.mockResolvedValue([
      { id: 'dp1', name: 'Point A', addressLine: 'Street 1, 00100, City' },
    ]);
    mockFetchPaymentMethods.mockResolvedValue([
      { id: 'pm1', name: 'Card' },
      { id: 'pm2', name: 'MobilePay' },
    ]);

    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<CheckoutPage />);
    });

    const setInput = (placeholder: string, value: string) => {
      const input = tree!.root.find((node) => node.type === 'TextInput' && node.props.placeholder === placeholder);
      renderer.act(() => {
        input.props.onChangeText(value);
      });
    };

    setInput('First name', 'John');
    setInput('Last name', 'Doe');
    setInput('Email', 'john@example.com');
    setInput('Phone number', '+358401234567');
    setInput('Street address', 'Main street 1');
    setInput('City', 'Helsinki');
    setInput('ZIP code', '00100');

    const loadButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Load delivery points'
    );
    await renderer.act(async () => {
      await loadButton.props.onPress();
    });

    const pointButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Select delivery point Point A'
    );
    await renderer.act(async () => {
      await pointButton.props.onPress();
    });

    const nextButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Continue to payment methods'
    );
    await renderer.act(async () => {
      await nextButton.props.onPress();
    });

    expect(mockFetchPaymentMethods).toHaveBeenCalledTimes(1);
    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Payment methods')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Card')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'MobilePay')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Order summary')).toBe(true);
  });

  it('shows payment methods error state when payment methods fetch fails', async () => {
    mockFetchDeliveryPointsByPostalCode.mockResolvedValue([
      { id: 'dp1', name: 'Point A', addressLine: 'Street 1, 00100, City' },
    ]);
    mockFetchPaymentMethods.mockRejectedValue(new Error('fail'));

    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<CheckoutPage />);
    });

    const setInput = (placeholder: string, value: string) => {
      const input = tree!.root.find((node) => node.type === 'TextInput' && node.props.placeholder === placeholder);
      renderer.act(() => {
        input.props.onChangeText(value);
      });
    };

    setInput('First name', 'John');
    setInput('Last name', 'Doe');
    setInput('Email', 'john@example.com');
    setInput('Phone number', '+358401234567');
    setInput('Street address', 'Main street 1');
    setInput('City', 'Helsinki');
    setInput('ZIP code', '00100');

    const loadButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Load delivery points'
    );
    await renderer.act(async () => {
      await loadButton.props.onPress();
    });

    const pointButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Select delivery point Point A'
    );
    await renderer.act(async () => {
      await pointButton.props.onPress();
    });

    const nextButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Continue to payment methods'
    );
    await renderer.act(async () => {
      await nextButton.props.onPress();
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Could not load payment methods. Please try again.')).toBe(true);
  });
});
