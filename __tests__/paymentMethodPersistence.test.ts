import { getPaymentSuccessReturnUrl, savePaymentMethodToOrder } from '@/hooks/paymentMethodPersistence';
import * as Linking from 'expo-linking';

jest.mock('expo-linking', () => ({
  openURL: jest.fn(),
}));

describe('payment method persistence', () => {
  it('resolves payment success return url from host origin', () => {
    expect(getPaymentSuccessReturnUrl('https://shop.example.com')).toBe('https://shop.example.com/payment/success');
    expect(getPaymentSuccessReturnUrl('https://shop.example.com/')).toBe('https://shop.example.com/payment/success');
  });

  it('patches active order with selected payment method and return url', async () => {
    const patch = jest.fn().mockResolvedValue({});
    const placeOrder = jest.fn().mockResolvedValue({ url: 'https://pay.example.com/session' });
    const originalLocation = globalThis.location;
    Object.defineProperty(globalThis, 'location', {
      configurable: true,
      value: { origin: 'https://shop.example.com' },
    });

    try {
      await savePaymentMethodToOrder('order-1', 'pm-123', { patch, placeOrder } as never);

      expect(patch).toHaveBeenCalledWith('order-1', {
        paymentMethod: 'pm-123',
        returnUrl: 'https://shop.example.com/payment/success',
      });
      expect(placeOrder).toHaveBeenCalledWith('order-1');
      expect(Linking.openURL).toHaveBeenCalledWith('https://pay.example.com/session');
    } finally {
      Object.defineProperty(globalThis, 'location', {
        configurable: true,
        value: originalLocation,
      });
    }
  });
});
