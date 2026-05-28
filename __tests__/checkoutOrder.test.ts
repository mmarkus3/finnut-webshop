import { buildCheckoutOrderPayload, syncOrderForCheckout } from '@/hooks/checkoutOrder';
import { CartItem } from '@/types/cart';
import { OrderCustomer } from '@/types/order';

describe('checkout order helpers', () => {
  const items: CartItem[] = [
    {
      product: { id: 'p1', name_fi: 'Omena', name_sv: 'Äpple', name_en: 'Apple', amount: 5, ean: '111', images: [], retailPrice: 9, unitPrice: 19 },
      quantity: 2,
    },
    {
      product: { name_en: 'Milk', name_fi: 'Maito', name_sv: 'Mjölk', amount: 3, ean: '222', images: [], retailPrice: 9, unitPrice: 19 },
      quantity: 1,
    },
  ];
  const customer: OrderCustomer = {
    firstname: 'Matti',
    lastname: 'Meikalainen',
    email: 'matti@example.com',
    address_street: 'Testikatu 1',
    address_city: 'Helsinki',
    address_zip: '00100',
    phone: '+358401234567',
  };

  it('maps cart items into order payload products', () => {
    const payload = buildCheckoutOrderPayload(items);
    expect(payload.status).toBe('draft');
    expect(payload.products).toEqual([
      { id: 'p1', name: 'Omena', amount: 2 },
      { id: '222', name: 'Maito', amount: 1 },
    ]);
  });

  it('includes customer phone in order payload when customer is provided', () => {
    const payload = buildCheckoutOrderPayload(items, customer);
    expect(payload.customer).toMatchObject({ phone: '+358401234567' });
  });

  it('includes discount code in order payload when provided', () => {
    const payload = buildCheckoutOrderPayload(items, undefined, ' SAVE10 ');
    expect(payload.discount).toBe('SAVE10');
  });

  it('updates existing active order when id exists', async () => {
    const save = jest.fn().mockResolvedValue({ id: 'order-1', status: 'draft', products: [] });

    await syncOrderForCheckout(items, 'order-1', undefined, undefined, 'en', { save });

    expect(save).toHaveBeenCalledTimes(1);
    expect(save.mock.calls[0][0]).toMatchObject({
      id: 'order-1',
      status: 'draft',
      products: [
        { id: 'p1', name: 'Apple', amount: 2 },
        { id: '222', name: 'Milk', amount: 1 },
      ],
    });
  });

  it('falls back to create when active-order update reports not-found', async () => {
    const save = jest
      .fn()
      .mockRejectedValueOnce({ response: { status: 404 } })
      .mockResolvedValueOnce({ id: 'new-order', status: 'draft', products: [] });

    await syncOrderForCheckout(items, 'stale-order', undefined, undefined, 'fi', { save });

    expect(save).toHaveBeenCalledTimes(2);
    expect(save.mock.calls[0][0]).toMatchObject({ id: 'stale-order' });
    expect(save.mock.calls[1][0]).not.toHaveProperty('id');
  });

  it('passes customer phone during sync payload mapping', async () => {
    const save = jest.fn().mockResolvedValue({ id: 'order-1', status: 'draft', products: [] });

    await syncOrderForCheckout(items, 'order-1', customer, undefined, 'fi', { save });

    expect(save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'order-1',
        customer: expect.objectContaining({ phone: '+358401234567' }),
      })
    );
  });

  it('passes discount code during sync payload mapping', async () => {
    const save = jest.fn().mockResolvedValue({ id: 'order-1', status: 'draft', products: [] });
    await syncOrderForCheckout(items, 'order-1', undefined, 'VIP20', 'fi', { save });
    expect(save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'order-1',
        discount: 'VIP20',
      })
    );
  });
});
