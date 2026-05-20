import { DELIVERY_POINTS_LIMIT, fetchDeliveryPointsByPostalCode } from '@/hooks/deliveryPoints';

describe('delivery points helper', () => {
  it('calls endpoint with postalCode param and limits to top 10', async () => {
    const request = jest.fn().mockResolvedValue({
      data: {
        pickupPoint: Array.from({ length: 12 }).map((_, i) => ({
          id: `p-${i + 1}`,
          name: `Point ${i + 1}`,
          address: `Street ${i + 1}`,
          postalCode: '00100',
          city: 'Helsinki',
        })),
      },
    });

    const points = await fetchDeliveryPointsByPostalCode('00100', { request } as never);

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      params: { postalCode: '00100', country: 'FI' },
    });
    expect(points).toHaveLength(DELIVERY_POINTS_LIMIT);
    expect(points[0].id).toBe('p-1');
    expect(points[9].id).toBe('p-10');
  });

  it('returns empty list for blank postal code', async () => {
    const request = jest.fn();
    const points = await fetchDeliveryPointsByPostalCode('   ', { request } as never);
    expect(points).toEqual([]);
    expect(request).not.toHaveBeenCalled();
  });
});
