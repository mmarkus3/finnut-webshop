import { mapCampaignDiscountPercentagesByProduct } from '@/hooks/checkoutDiscount';

describe('checkout discount campaign mapping', () => {
  it('maps product-level discount percentage by productId, id, and ean', () => {
    const mapped = mapCampaignDiscountPercentagesByProduct({
      products: [
        { productId: 'p1', discountPercentage: 10 },
        { id: 'p2', discountPercentage: 15 },
        { ean: 'ean-3', discountPercentage: 0.2 },
      ],
    });

    expect(mapped).toEqual({ p1: 10, p2: 15, 'ean-3': 0.2 });
  });

  it('skips invalid product entries and returns empty map when missing campaign', () => {
    expect(mapCampaignDiscountPercentagesByProduct(null)).toEqual({});
    expect(
      mapCampaignDiscountPercentagesByProduct({
        products: [
          { productId: '  ', discountPercentage: 10 },
          { productId: 'p1' },
        ],
      })
    ).toEqual({});
  });
});
