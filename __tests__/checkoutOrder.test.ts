import { buildCheckoutOrderPayload, createOrderForCheckout, syncOrderForCheckout } from '@/hooks/checkoutOrder';
import { CartItem } from '@/types/cart';

describe('checkout order helpers', () => {
  const items: CartItem[] = [
    {
      product: { id: 'p1', name: 'Apple', amount: 5, ean: '111', images: [] },
      quantity: 2,
    },
    {
      product: { name: 'Milk', amount: 3, ean: '222', images: [] },
      quantity: 1,
    },
  ];

  it('maps cart items into order payload products', () => {
    const payload = buildCheckoutOrderPayload(items);
    expect(payload.status).toBe('draft');
    expect(payload.products).toEqual([
      { id: 'p1', name: 'Apple', amount: 2 },
      { id: '222', name: 'Milk', amount: 1 },
    ]);
  });

  it('invokes service save with mapped payload', async () => {
    const save = jest.fn().mockResolvedValue({ id: 'order-1', status: 'draft', products: [] });

    await createOrderForCheckout(items, { save });

    expect(save).toHaveBeenCalledTimes(1);
    expect(save.mock.calls[0][0]).toMatchObject({
      status: 'draft',
      products: [
        { id: 'p1', name: 'Apple', amount: 2 },
        { id: '222', name: 'Milk', amount: 1 },
      ],
    });
  });

  it('updates existing active order when id exists', async () => {
    const save = jest.fn().mockResolvedValue({ id: 'order-1', status: 'draft', products: [] });

    await syncOrderForCheckout(items, 'order-1', { save });

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

    await syncOrderForCheckout(items, 'stale-order', { save });

    expect(save).toHaveBeenCalledTimes(2);
    expect(save.mock.calls[0][0]).toMatchObject({ id: 'stale-order' });
    expect(save.mock.calls[1][0]).not.toHaveProperty('id');
  });
});
