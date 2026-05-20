import { fetchDeliveryPricing } from '@/hooks/deliveryPricing';

describe('fetchDeliveryPricing', () => {
  it('returns normalized pricing when over and delivery are finite numbers', async () => {
    const request = jest.fn().mockResolvedValue({ data: { over: 80, delivery: 7.9 } });
    const pricing = await fetchDeliveryPricing({ request } as never);

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      url: `/orders/company/${process.env.EXPO_PUBLIC_COMPANY!}/prices`,
      params: { country: 'FI' },
    });
    expect(pricing).toEqual({ over: 80, delivery: 7.9 });
  });

  it('returns null when payload has invalid numbers', async () => {
    const request = jest.fn().mockResolvedValue({ data: { over: '80', delivery: null } });
    const pricing = await fetchDeliveryPricing({ request } as never);
    expect(pricing).toBeNull();
  });
});
