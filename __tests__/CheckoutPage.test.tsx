import { CheckoutPage, getCheckoutSectionsLayoutClass, isDesktopWidth } from '@/components/checkout/CheckoutPage';
import React from 'react';
import renderer from 'react-test-renderer';

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

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ orderId: 'order-1' }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, string | number>) => {
      if (key === 'checkout.title') return 'Checkout';
      if (key === 'checkout.orderIdLabel') return `Order ID: ${options?.orderId}`;
      if (key === 'checkout.customerInfoTitle') return 'Customer information';
      if (key === 'checkout.firstnameLabel') return 'First name';
      if (key === 'checkout.lastnameLabel') return 'Last name';
      if (key === 'checkout.emailLabel') return 'Email';
      if (key === 'checkout.addressStreetLabel') return 'Street address';
      if (key === 'checkout.addressCityLabel') return 'City';
      if (key === 'checkout.addressZipLabel') return 'ZIP code';
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
  it('renders customer form and summary with order id', () => {
    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<CheckoutPage />);
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Checkout')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Customer information')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Order summary')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Subtotal')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'VAT (included in price)')).toBe(true);

    const inputs = tree!.root.findAllByType('TextInput');
    expect(inputs.length).toBe(6);
  });

  it('uses responsive layout helpers for desktop and mobile', () => {
    expect(isDesktopWidth(390)).toBe(false);
    expect(isDesktopWidth(1200)).toBe(true);
    expect(getCheckoutSectionsLayoutClass(false)).toContain('flex-col');
    expect(getCheckoutSectionsLayoutClass(true)).toContain('flex-row');
  });
});
