import {
  clampSelectedQuantity,
  formatOptionalNumber,
  getLocalizedIngredients,
  getMaxAddableQuantity,
  getProductDetailSections,
  getProductImageSlides,
  getUnitPricePerKgText,
  isDesktopWidth,
} from '@/components/product/ProductDetailPage';
import { Product } from '@/types/product';
import { getProductPriceDisplay, getUsableProductImages, resolveProductByIdentifier } from '@/components/product/cardUtils';
import { getAvailabilityStatusMeta, getAvailabilityStatusKey } from '@/components/product/availabilityStatus';

const t = (key: string, options?: Record<string, unknown>) => {
  if (key === 'product.unitPricePerKgLabel') {
    return `Unit price: ${options?.price}/kg`;
  }
  return key;
};

describe('ProductDetailPage helpers', () => {
  it('detects desktop and mobile breakpoints', () => {
    expect(isDesktopWidth(375)).toBe(false);
    expect(isDesktopWidth(1280)).toBe(true);
  });

  it('resolves selected product by route identifier', () => {
    const products: Product[] = [
      { id: 'p1', name: 'Apple', amount: 1, ean: 'ean-1', images: [] },
      { name: 'Milk', amount: 2, ean: 'ean-2', images: [] },
    ];

    expect(resolveProductByIdentifier(products, 'p1')?.name).toBe('Apple');
    expect(resolveProductByIdentifier(products, 'ean-2')?.name).toBe('Milk');
    expect(resolveProductByIdentifier(products, 'unknown')).toBeNull();
  });

  it('normalizes product image list for zero, single, and multiple images', () => {
    const noImages: Product = { id: 'p0', name: 'NoImg', amount: 1, ean: 'ean-0', images: [] };
    const singleImage: Product = { id: 'p1', name: 'OneImg', amount: 1, ean: 'ean-1', images: ['  https://img/one.jpg  '] };
    const multipleImages: Product = {
      id: 'p2',
      name: 'ManyImg',
      amount: 1,
      ean: 'ean-2',
      images: ['https://img/1.jpg', '   ', 'https://img/2.jpg'],
    };

    expect(getUsableProductImages(noImages)).toEqual([]);
    expect(getUsableProductImages(singleImage)).toEqual(['https://img/one.jpg']);
    expect(getUsableProductImages(multipleImages)).toEqual(['https://img/1.jpg', 'https://img/2.jpg']);

    expect(getProductImageSlides(getUsableProductImages(noImages))).toHaveLength(1);
    expect(getProductImageSlides(getUsableProductImages(singleImage))).toEqual(['https://img/one.jpg']);
    expect(getProductImageSlides(getUsableProductImages(multipleImages))).toEqual(['https://img/1.jpg', 'https://img/2.jpg']);
  });

  it('formats optional numbers and localizes ingredient fallback', () => {
    expect(formatOptionalNumber(12.5)).toBe('12.5');
    expect(formatOptionalNumber(undefined)).toBeNull();

    const product: Product = {
      id: 'p',
      name: 'Yogurt',
      amount: 1,
      ean: 'ean',
      images: [],
      ingredients_fi: 'maito',
      ingredients_en: 'milk',
    };

    expect(getLocalizedIngredients(product, 'en')).toBe('milk');
    expect(getLocalizedIngredients(product, 'sv')).toBe('maito');
    expect(getLocalizedIngredients(product, 'fi')).toBe('maito');
  });

  it('returns localized unit price per kg text when unitPrice exists and null otherwise', () => {
    const productWithUnitPrice: Product = {
      id: 'p3',
      name: 'Flour',
      amount: 1,
      ean: 'ean-3',
      images: [],
      unitPrice: 3.2,
    };

    const productWithoutUnitPrice: Product = {
      id: 'p4',
      name: 'Sugar',
      amount: 1,
      ean: 'ean-4',
      images: [],
    };

    expect(getUnitPricePerKgText(productWithUnitPrice, 'en', t)).toBe('Unit price: 3.20 €/kg');
    expect(getUnitPricePerKgText(productWithoutUnitPrice, 'en', t)).toBeNull();
  });

  it('derives detail price display for discount and regular products', () => {
    const discounted: Product = {
      id: 'p10',
      name: 'Chips',
      amount: 2,
      ean: 'ean-10',
      images: [],
      retailPrice: 4.9,
      discountPrice: 3.9,
      lowestRetailPriceLast30Days: 4.2,
    };
    const regular: Product = { id: 'p11', name: 'Nuts', amount: 2, ean: 'ean-11', images: [], retailPrice: 2.5 };

    expect(getProductPriceDisplay(discounted)).toEqual({
      hasDiscount: true,
      discountPrice: 3.9,
      retailPrice: 4.9,
      lowestRetailPriceLast30Days: 4.2,
    });
    expect(getProductPriceDisplay(regular)).toEqual({
      hasDiscount: false,
      discountPrice: null,
      retailPrice: 2.5,
      lowestRetailPriceLast30Days: null,
    });
  });

  it('provides quantity helper behavior for multi-add selection', () => {
    const product: Product = { id: 'p9', name: 'Beans', amount: 7, ean: 'ean-9', images: [] };
    expect(getMaxAddableQuantity(product)).toBe(7);
    expect(clampSelectedQuantity(0, 7)).toBe(1);
    expect(clampSelectedQuantity(8, 7)).toBe(7);
    expect(clampSelectedQuantity(3, 7)).toBe(3);
  });

  it('builds complete product detail sections with safe fallbacks', () => {
    const product: Product = {
      id: 'p2',
      name: 'Granola',
      amount: 3,
      ean: 'ean-22',
      images: [],
      countryOfOrigin: 'Finland',
      description_en: 'Crunchy granola',
      ingredients_en: 'oats',
      energyJoule: 1000,
      energyCalory: 400,
      fat: 10,
      saturatedFat: 2,
      carbohydrate: 60,
      saturatedCarbohydrate: 20,
      protein: 8,
      salt: 1,
      fiber: 5,
    };

    const sections = getProductDetailSections(product, 'en', t);
    expect(sections).toHaveLength(4);
    expect(sections[0].title).toBe('product.descriptionLabel');
    expect(sections[0].fields[0].value).toBe('Crunchy granola');
    expect(sections[2].fields.some((field) => field.value === '1000')).toBe(true);
    expect(sections[3].fields[0].value).toBe('Finland');

    const fallbackSections = getProductDetailSections(
      { id: 'x', name: 'X', amount: 1, ean: 'x', images: [] },
      'en',
      t
    );
    expect(fallbackSections[0].fields[0].value).toBe('product.unavailableValue');
  });

  it('provides availability status labels and styles for product detail thresholds', () => {
    expect(getAvailabilityStatusKey(0)).toBe('outOfStock');
    expect(getAvailabilityStatusMeta(0).labelKey).toBe('availability.outOfStock');
    expect(getAvailabilityStatusMeta(0).textClassName).toBe('text-red-700');

    expect(getAvailabilityStatusKey(4)).toBe('lowStock');
    expect(getAvailabilityStatusMeta(4).labelKey).toBe('availability.lowStock');
    expect(getAvailabilityStatusMeta(4).textClassName).toBe('text-yellow-700');

    expect(getAvailabilityStatusKey(10)).toBe('inStock');
    expect(getAvailabilityStatusMeta(10).labelKey).toBe('availability.inStock');
    expect(getAvailabilityStatusMeta(10).textClassName).toBe('text-green-700');
  });
});
