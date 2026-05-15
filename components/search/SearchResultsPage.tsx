import { filterProductsByQuery, normalizeSearchQuery } from '@/hooks/productSearch';
import { Product } from '@/types/product';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryProductGrid } from '@/components/category/CategoryProductGrid';
import { Category } from '@/types/category';
import { Text, View } from 'react-native';

interface SearchResultsPageProps {
  products: Product[];
  query: string;
  isLoading: boolean;
}

const SEARCH_CATEGORY_ID = '__search_results__';

const mapProductsToSearchCategory = (products: Product[]): Product[] => {
  return products.map((product) => ({ ...product, category: SEARCH_CATEGORY_ID }));
};

const getSearchPseudoCategory = (title: string): Category[] => [
  { id: SEARCH_CATEGORY_ID, name: title, description: '' },
];

export function SearchResultsPage({ products, query, isLoading }: SearchResultsPageProps) {
  const { t } = useTranslation();
  const normalizedQuery = normalizeSearchQuery(query);

  const filteredProducts = useMemo(
    () => mapProductsToSearchCategory(filterProductsByQuery(products, normalizedQuery)),
    [products, normalizedQuery]
  );

  const categories = getSearchPseudoCategory(t('search.resultsTitle', { query: normalizedQuery }));

  if (!normalizedQuery) {
    return (
      <View className="flex-1 bg-white px-4 py-6">
        <Text className="text-base text-neutral-600">{t('search.enterQuery')}</Text>
      </View>
    );
  }

  if (!isLoading && filteredProducts.length === 0) {
    return (
      <View className="flex-1 bg-white px-4 py-6">
        <Text className="text-xl font-semibold text-neutral-900">{t('search.resultsHeader', { query: normalizedQuery })}</Text>
        <Text className="mt-2 text-sm text-neutral-600">{t('search.noResults')}</Text>
      </View>
    );
  }

  return (
    <CategoryProductGrid
      categories={categories}
      categoryId={SEARCH_CATEGORY_ID}
      products={filteredProducts}
      isLoading={isLoading}
    />
  );
}

export { mapProductsToSearchCategory, getSearchPseudoCategory };
