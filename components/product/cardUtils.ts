import { Product } from '@/types/product';

const getFirstUsableProductImage = (product: Product): string | null => {
  if (!Array.isArray(product.images) || product.images.length === 0) {
    return null;
  }

  const firstImage = product.images[0]?.trim();
  return firstImage ? firstImage : null;
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
  return product.retailPrice ?? product.unitPrice ?? null;
};

export { getFirstUsableProductImage, getProductDescription, getProductPrice };
