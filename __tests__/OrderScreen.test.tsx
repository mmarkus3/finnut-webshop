import OrderScreen, { normalizeOrderId } from '@/app/order';
import React from 'react';
import renderer from 'react-test-renderer';

const mockOrderDetailsPage = jest.fn();
let mockSearchParams: { orderId?: string | string[] } = {};

jest.mock('@/components/layout/AppPageWithInfoLink', () => ({
  AppPageWithInfoLink: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@/components/order/OrderDetailsPage', () => ({
  OrderDetailsPage: (props: { orderId: string | null }) => {
    mockOrderDetailsPage(props);
    return null;
  },
}));

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => mockSearchParams,
}));

describe('OrderScreen', () => {
  beforeEach(() => {
    mockOrderDetailsPage.mockReset();
    mockSearchParams = {};
  });

  it('passes a normalized orderId query parameter to the order details page', () => {
    mockSearchParams = { orderId: ' order-123 ' };

    renderer.act(() => {
      renderer.create(<OrderScreen />);
    });

    expect(mockOrderDetailsPage).toHaveBeenCalledWith({ orderId: 'order-123' });
  });

  it('treats missing or empty query parameter values as absent', () => {
    expect(normalizeOrderId(undefined)).toBeNull();
    expect(normalizeOrderId('   ')).toBeNull();
    expect(normalizeOrderId([' order-456 ', 'ignored'])).toBe('order-456');
  });
});
