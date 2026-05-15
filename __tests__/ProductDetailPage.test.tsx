import {
  formatOptionalNumber,
  getLocalizedIngredients,
  getProductDetailSections,
  isDesktopWidth,
} from '@/components/product/ProductDetailPage';
import { Product } from '@/types/product';
import { resolveProductByIdentifier } from '@/components/product/cardUtils';

const t = (key: string) => key;

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
    expect(sections).toHaveLength(3);
    expect(sections[0].title).toBe('product.originSectionTitle');
    expect(sections[0].fields[0].value).toBe('Finland');
    expect(sections[1].fields[0].value).toBe('oats');
    expect(sections[2].fields.some((field) => field.value === '1000')).toBe(true);

    const fallbackSections = getProductDetailSections(
      { id: 'x', name: 'X', amount: 1, ean: 'x', images: [] },
      'en',
      t
    );
    expect(fallbackSections[0].fields[0].value).toBe('product.unavailableValue');
  });
});
