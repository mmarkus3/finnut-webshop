import { Product } from '@/types/product';

const normalizeSearchQuery = (query: string): string => query.trim().toLocaleLowerCase();

const buildSearchHaystack = (product: Product): string => {
  return [product.name_fi, product.name_sv, product.name_en, product.ean, product.description_fi, product.description_en, product.description_sv]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase();
};

const filterProductsByQuery = (products: Product[], query: string): Product[] => {
  const normalized = normalizeSearchQuery(query);

  if (!normalized) {
    return [];
  }

  return products.filter((product) => buildSearchHaystack(product).includes(normalized));
};

export { filterProductsByQuery, normalizeSearchQuery };

