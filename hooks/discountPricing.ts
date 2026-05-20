import { getProductIdentifier, getProductPrice } from '@/components/product/cardUtils';
import { CartItem } from '@/types/cart';

interface DiscountLinePricing {
  productId: string;
  unitOriginal: number | null;
  unitDiscounted: number | null;
  lineOriginal: number | null;
  lineDiscounted: number | null;
}

interface CartDiscountTotals {
  subtotalOriginal: number;
  subtotalDiscounted: number;
  vatOriginal: number;
  vatDiscounted: number;
}

interface ProductDiscountValue {
  discountPercentage?: number | null;
  discountFixed?: number | null;
}

type DiscountsByProduct = Record<string, ProductDiscountValue>;

const roundCurrency = (value: number): number => Math.round((value + Number.EPSILON) * 100) / 100;

const normalizeDiscountPercentage = (discountPercentage: number | null): number | null => {
  if (!Number.isFinite(discountPercentage)) {
    return null;
  }

  const raw = discountPercentage!;
  if (raw <= 0) {
    return null;
  }

  const normalized = raw > 1 ? raw / 100 : raw;
  if (normalized <= 0 || normalized >= 1) {
    return null;
  }

  return normalized;
};

const calculateDiscountedUnitPrice = (unitOriginal: number | null, discountPercentage: number | null): number | null => {
  if (unitOriginal === null) {
    return null;
  }

  const normalized = normalizeDiscountPercentage(discountPercentage);
  if (normalized === null) {
    return unitOriginal;
  }

  return roundCurrency(unitOriginal * (1 - normalized));
};

const calculateFixedDiscountedUnitPrice = (discountFixed: number | null): number | null => {
  if (!Number.isFinite(discountFixed)) {
    return null;
  }

  return Math.max(0, roundCurrency(discountFixed!));
};

const getDiscountLinePricing = (item: CartItem, discountPercentagesByProduct: DiscountsByProduct): DiscountLinePricing => {
  const productId = getProductIdentifier(item.product);
  const unitOriginal = getProductPrice(item.product);
  const productDiscount = discountPercentagesByProduct[productId];
  const fixedDiscountedUnitPrice = calculateFixedDiscountedUnitPrice(productDiscount?.discountFixed ?? null);
  const unitDiscounted = fixedDiscountedUnitPrice ?? calculateDiscountedUnitPrice(unitOriginal, productDiscount?.discountPercentage ?? null);

  return {
    productId,
    unitOriginal,
    unitDiscounted,
    lineOriginal: unitOriginal === null ? null : roundCurrency(unitOriginal * item.quantity),
    lineDiscounted: unitDiscounted === null ? null : roundCurrency(unitDiscounted * item.quantity),
  };
};

const getCartDiscountTotals = (items: CartItem[], discountPercentagesByProduct: DiscountsByProduct): CartDiscountTotals => {
  return items.reduce<CartDiscountTotals>((totals, item) => {
    const linePricing = getDiscountLinePricing(item, discountPercentagesByProduct);
    const taxRate = Number.isFinite(item.product.tax) ? item.product.tax! : 0;

    if (linePricing.lineOriginal !== null) {
      totals.subtotalOriginal = roundCurrency(totals.subtotalOriginal + linePricing.lineOriginal);
      totals.vatOriginal = roundCurrency(totals.vatOriginal + (linePricing.lineOriginal * taxRate));
    }

    if (linePricing.lineDiscounted !== null) {
      totals.subtotalDiscounted = roundCurrency(totals.subtotalDiscounted + linePricing.lineDiscounted);
      totals.vatDiscounted = roundCurrency(totals.vatDiscounted + (linePricing.lineDiscounted * taxRate));
    }

    return totals;
  }, {
    subtotalOriginal: 0,
    subtotalDiscounted: 0,
    vatOriginal: 0,
    vatDiscounted: 0,
  });
};

export {
  calculateFixedDiscountedUnitPrice,
  calculateDiscountedUnitPrice,
  getCartDiscountTotals,
  getDiscountLinePricing,
  normalizeDiscountPercentage,
  roundCurrency,
  type DiscountsByProduct,
  type ProductDiscountValue,
  type CartDiscountTotals,
  type DiscountLinePricing
};
