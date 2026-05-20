import { mapCampaignDiscountPercentagesByProduct } from '@/hooks/checkoutDiscount';

describe('checkout discount campaign mapping', () => {
  it('maps product-level discount percentage by productId, id, and ean', () => {
    const mapped = mapCampaignDiscountPercentagesByProduct({
      products: [
        { id: 'p1', discountPercentage: 10 },
        { id: 'p2', discountFixed: 3.5 },
        { id: 'ean-3', discountPercentage: 0.2, discountFixed: 1.2 },
      ],
    });

    expect(mapped).toEqual({
      p1: { discountPercentage: 10 },
      p2: { discountFixed: 3.5 },
      'ean-3': { discountPercentage: 0.2, discountFixed: 1.2 },
    });
  });

  it('skips invalid product entries and returns empty map when missing campaign', () => {
    expect(mapCampaignDiscountPercentagesByProduct(null)).toEqual({});
    expect(
      mapCampaignDiscountPercentagesByProduct({
        products: [
          { id: '  ', discountPercentage: 10 },
          { id: 'p1' },
        ],
      })
    ).toEqual({});
  });
});
