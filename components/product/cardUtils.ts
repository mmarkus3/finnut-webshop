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

const getProductIdentifier = (product: Product): string => {
  return product.id ?? product.ean;
};

const resolveProductByIdentifier = (products: Product[], productId: string): Product | null => {
  return products.find((product) => getProductIdentifier(product) === productId) ?? null;
};

export {
  getUsableProductImages,
  getFirstUsableProductImage,
  getProductDescription,
  getProductPrice,
  getProductIdentifier,
  resolveProductByIdentifier,
};
