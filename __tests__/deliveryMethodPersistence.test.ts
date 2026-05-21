import { saveDeliveryMethodToOrder } from '@/hooks/deliveryMethodPersistence';

describe('delivery method persistence', () => {
  it('patches active order with selected delivery method id and customer', async () => {
    const patch = jest.fn().mockResolvedValue({});
    const customer = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      address_street: 'Main street 1',
      address_city: 'Helsinki',
      address_zip: '00100',
      phone: '+358401234567',
    };

    await saveDeliveryMethodToOrder('order-1', 'point-123', customer, { patch });

    expect(patch).toHaveBeenCalledWith('order-1', {
      deliveryMethod: 'point-123',
      customer,
    });
  });
});
