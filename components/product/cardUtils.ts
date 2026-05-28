import { Product } from '@/types/product';

const getUsableProductImages = (product: Product): string[] => {
  if (!Array.isArray(product.images) || product.images.length === 0) {
    return [];
  }

  return product.images
    .map((image) => image?.trim())
    .filter((image): image is string => Boolean(image));
};

const getFirstUsableProductImage = (product: Product): string | null => {
  return getUsableProductImages(product)[0] ?? null;
};

export const getItemName = (item?: { name_fi: string; name_sv: string; name_en: string }, language?: string): string | null => {
  if (item == null) {
    return null;
  }

  if (language === 'en') {
    return item.name_en ?? item.name_fi ?? item.name_sv ?? '';
  }

  if (language === 'sv') {
    return item.name_sv ?? item.name_fi ?? item.name_en ?? '';
  }

  return item.name_fi ?? item.name_en ?? item.name_sv ?? '';
};

const getProductDescription = (product: Product, language: string): string => {
  if (language === 'en') {
    return product.description_en ?? product.description_fi ?? product.description_sv ?? '';
  }

  if (language === 'sv') {
    return product.description_sv ?? product.description_fi ?? product.description_en ?? '';
  }

  return product.description_fi ?? product.description_en ?? product.description_sv ?? '';
};

const getProductPrice = (product: Product): number | null => {
  return product.discountPrice ?? product.retailPrice ?? product.unitPrice ?? null;
};

interface ProductPriceDisplay {
  hasDiscount: boolean;
  discountPrice: number | null;
  retailPrice: number | null;
  lowestRetailPriceLast30Days: number | null;
}

const toFiniteNumberOrNull = (value: number | undefined): number | null => {
  return Number.isFinite(value) ? value! : null;
};

const getProductPriceDisplay = (product: Product): ProductPriceDisplay => {
  const discountPrice = toFiniteNumberOrNull(product.discountPrice);
  const retailPrice = toFiniteNumberOrNull(product.retailPrice) ?? toFiniteNumberOrNull(product.unitPrice);
  const lowestRetailPriceLast30Days = toFiniteNumberOrNull(product.lowestRetailPriceLast30Days);
  const hasDiscount = discountPrice !== null;

  return {
    hasDiscount,
    discountPrice,
    retailPrice,
    lowestRetailPriceLast30Days: hasDiscount ? lowestRetailPriceLast30Days : null,
  };
};

const getProductIdentifier = (product: Product): string => {
  return product.id ?? product.ean;
};

const resolveProductByIdentifier = (products: Product[], productId: string): Product | null => {
  return products.find((product) => getProductIdentifier(product) === productId) ?? null;
};

export {
  getFirstUsableProductImage,
  getProductDescription, getProductIdentifier, getProductPrice,
  getProductPriceDisplay, getUsableProductImages, resolveProductByIdentifier
};

