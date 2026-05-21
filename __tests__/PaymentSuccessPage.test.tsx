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
      if (key === 'paymentSuccess.title') return 'Kiitos tilauksestanne';
      if (key === 'paymentSuccess.body') return 'Tilauksenne on vastaanotettu ja käsitellään mahdollisimman pian';
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
    mockUseLocalSearchParams.mockReturnValue({
      AUTHCODE: '5853FEDFA20B3991552336BA760CA79CAFB783A5380D1B287366527DA9881F08',
      RETURN_CODE: '0',
      ORDER_NUMBER: 'aK1UtNP66eMrGax56G4C',
      SETTLED: '1',
    });
  });

  it('renders success message with provider query parameters and clears cart', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<PaymentSuccessPage />);
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Kiitos tilauksestanne')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Tilauksenne on vastaanotettu ja käsitellään mahdollisimman pian')).toBe(true);
    expect(mockUseLocalSearchParams).toHaveBeenCalledTimes(1);
    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });

  it('navigates home when home button is pressed', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<PaymentSuccessPage />);
    });

    const homeButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Palaa etusivulle'
    );

    renderer.act(() => {
      homeButton.props.onPress();
    });

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
