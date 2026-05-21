import { PaymentSuccessPage } from '@/components/payment/PaymentSuccessPage';
import React from 'react';
import renderer from 'react-test-renderer';

const mockClearCart = jest.fn();
const mockPush = jest.fn();
const mockUseLocalSearchParams = jest.fn();

jest.mock('@/hooks/cart', () => ({
  useCart: () => ({
    clearCart: mockClearCart,
  }),
}));

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => mockUseLocalSearchParams(),
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === 'paymentSuccess.success.title') return 'Kiitos tilauksestanne';
      if (key === 'paymentSuccess.success.body') return 'Tilauksenne on vastaanotettu ja käsitellään mahdollisimman pian';
      if (key === 'paymentSuccess.failed.title') return 'Payment failed';
      if (key === 'paymentSuccess.failed.body') return 'The payment was not completed successfully. You can try paying again.';
      if (key === 'paymentSuccess.unresolved.title') return 'Payment status needs review';
      if (key === 'paymentSuccess.unresolved.body') return 'The transaction status could not be updated after returning from the bank. The merchant will resolve the payment status.';
      if (key === 'paymentSuccess.maintenance.title') return 'Payment service maintenance';
      if (key === 'paymentSuccess.maintenance.body') return 'The transaction was not created because of a maintenance break. Please try again later.';
      if (key === 'paymentSuccess.unknown.title') return 'Payment status unknown';
      if (key === 'paymentSuccess.unknown.body') return 'The payment status could not be confirmed. Please contact customer service if needed.';
      if (key === 'paymentSuccess.homeButton') return 'Palaa etusivulle';
      return key;
    },
  }),
}));

describe('PaymentSuccessPage', () => {
  beforeEach(() => {
    mockClearCart.mockReset();
    mockPush.mockReset();
    mockUseLocalSearchParams.mockReset();
    mockUseLocalSearchParams.mockReturnValue({});
  });

  const renderPage = (returnCode?: string) => {
    mockUseLocalSearchParams.mockReturnValue({
      AUTHCODE: '5853FEDFA20B3991552336BA760CA79CAFB783A5380D1B287366527DA9881F08',
      ...(returnCode === undefined ? {} : { RETURN_CODE: returnCode }),
      ORDER_NUMBER: 'aK1UtNP66eMrGax56G4C',
      SETTLED: '1',
    });
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<PaymentSuccessPage />);
    });

    return tree;
  };

  it('renders success message with provider query parameters and clears cart for return code 0', () => {
    const tree = renderPage('0');
    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Kiitos tilauksestanne')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Tilauksenne on vastaanotettu ja käsitellään mahdollisimman pian')).toBe(true);
    expect(mockUseLocalSearchParams).toHaveBeenCalledTimes(1);
    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['1', 'Payment failed', 'The payment was not completed successfully. You can try paying again.'],
    ['4', 'Payment status needs review', 'The transaction status could not be updated after returning from the bank. The merchant will resolve the payment status.'],
    ['10', 'Payment service maintenance', 'The transaction was not created because of a maintenance break. Please try again later.'],
  ])('renders non-success status for return code %s without clearing cart', (returnCode, title, body) => {
    const tree = renderPage(returnCode);
    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === title)).toBe(true);
    expect(textNodes.some((node) => node.props.children === body)).toBe(true);
    expect(mockClearCart).not.toHaveBeenCalled();
  });

  it.each([
    [undefined],
    ['999'],
  ])('renders unknown status without clearing cart for missing or unknown return code', (returnCode) => {
    const tree = renderPage(returnCode);
    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Payment status unknown')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'The payment status could not be confirmed. Please contact customer service if needed.')).toBe(true);
    expect(mockClearCart).not.toHaveBeenCalled();
  });

  it('navigates home when home button is pressed', () => {
    const tree = renderPage('0');

    const homeButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Palaa etusivulle'
    );

    renderer.act(() => {
      homeButton.props.onPress();
    });

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
