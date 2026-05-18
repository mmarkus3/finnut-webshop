import { saveDeliveryMethodToOrder } from '@/hooks/deliveryMethodPersistence';

describe('delivery method persistence', () => {
  it('patches active order with selected delivery method id', async () => {
    const patch = jest.fn().mockResolvedValue({});

    await saveDeliveryMethodToOrder('order-1', 'point-123', { patch });

    expect(patch).toHaveBeenCalledWith('order-1', { deliveryMethod: 'point-123' });
  });
});
