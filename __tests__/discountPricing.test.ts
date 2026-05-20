import { calculateDiscountedUnitPrice, getCartDiscountTotals, getDiscountLinePricing, normalizeDiscountPercentage } from '@/hooks/discountPricing';
import { CartItem } from '@/types/cart';

describe('discount pricing helpers', () => {
  const items: CartItem[] = [
    { product: { id: 'p1', name: 'Apple', amount: 5, ean: '111', images: [], retailPrice: 10, tax: 0.255 }, quantity: 2 },
    { product: { id: 'p2', name: 'Milk', amount: 5, ean: '222', images: [], retailPrice: 5, tax: 0.14 }, quantity: 1 },
  ];

  it('normalizes percentage values from percent and fraction formats', () => {
    expect(normalizeDiscountPercentage(10)).toBe(0.1);
    expect(normalizeDiscountPercentage(0.2)).toBe(0.2);
    expect(normalizeDiscountPercentage(0)).toBeNull();
    expect(normalizeDiscountPercentage(1)).toBeNull();
  });

  it('calculates discounted unit price with rounding', () => {
    expect(calculateDiscountedUnitPrice(9.99, 10)).toBe(8.99);
    expect(calculateDiscountedUnitPrice(9.99, null)).toBe(9.99);
    expect(calculateDiscountedUnitPrice(null, 10)).toBeNull();
  });

  it('returns line pricing with original and discounted prices', () => {
    const line = getDiscountLinePricing(items[0], { p1: 10 });
    expect(line.unitOriginal).toBe(10);
    expect(line.unitDiscounted).toBe(9);
    expect(line.lineOriginal).toBe(20);
    expect(line.lineDiscounted).toBe(18);
  });

  it('returns cart totals for original and discounted subtotals and vat', () => {
    const totals = getCartDiscountTotals(items, { p1: 10 });
    expect(totals.subtotalOriginal).toBe(25);
    expect(totals.subtotalDiscounted).toBe(23);
    expect(totals.vatOriginal).toBeCloseTo((20 * 0.255) + (5 * 0.14), 6);
    expect(totals.vatDiscounted).toBeCloseTo((18 * 0.255) + (5 * 0.14), 6);
  });
});
