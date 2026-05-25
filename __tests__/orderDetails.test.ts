import { fetchOrderDetails } from '@/hooks/orderDetails';

describe('order details helper', () => {
  it('retrieves the selected order with OrdersService.get', async () => {
    const order = { id: 'order-123', status: 'placed', products: [], country: 'FI' } as const;
    const get = jest.fn().mockResolvedValue(order);

    const result = await fetchOrderDetails('order-123', { get } as never);

    expect(get).toHaveBeenCalledWith('order-123');
    expect(result).toBe(order);
  });
});
