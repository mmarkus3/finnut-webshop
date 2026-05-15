import { getDeliveryCost } from '@/hooks/deliveryPricing';

describe('delivery pricing threshold logic', () => {
  it('returns free delivery when total is at or above threshold', () => {
    expect(getDeliveryCost(100, { over: 80, delivery: 7.9 })).toEqual({ isFree: true, cost: 0, over: 80 });
    expect(getDeliveryCost(80, { over: 80, delivery: 7.9 })).toEqual({ isFree: true, cost: 0, over: 80 });
  });

  it('returns delivery fee when total is below threshold', () => {
    expect(getDeliveryCost(79.99, { over: 80, delivery: 7.9 })).toEqual({ isFree: false, cost: 7.9, over: 80 });
  });

  it('returns fallback when pricing unavailable', () => {
    expect(getDeliveryCost(50, null)).toEqual({ isFree: false, cost: null, over: null });
  });
});
