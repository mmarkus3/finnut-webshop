import { getAvailabilityStatusKey, getAvailabilityStatusMeta } from '@/components/product/availabilityStatus';

describe('availabilityStatus helpers', () => {
  it('maps amounts to correct status key thresholds', () => {
    expect(getAvailabilityStatusKey(0)).toBe('outOfStock');
    expect(getAvailabilityStatusKey(-2)).toBe('outOfStock');
    expect(getAvailabilityStatusKey(1)).toBe('lowStock');
    expect(getAvailabilityStatusKey(9)).toBe('lowStock');
    expect(getAvailabilityStatusKey(10)).toBe('inStock');
    expect(getAvailabilityStatusKey(120)).toBe('inStock');
  });

  it('returns label and style metadata per status', () => {
    expect(getAvailabilityStatusMeta(0)).toEqual({
      key: 'outOfStock',
      labelKey: 'availability.outOfStock',
      textClassName: 'text-red-700',
      bgClassName: 'bg-red-100',
    });

    expect(getAvailabilityStatusMeta(4)).toEqual({
      key: 'lowStock',
      labelKey: 'availability.lowStock',
      textClassName: 'text-yellow-700',
      bgClassName: 'bg-yellow-100',
    });

    expect(getAvailabilityStatusMeta(20)).toEqual({
      key: 'inStock',
      labelKey: 'availability.inStock',
      textClassName: 'text-green-700',
      bgClassName: 'bg-green-100',
    });
  });
});
