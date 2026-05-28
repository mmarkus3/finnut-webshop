import { themeColors } from '@/constants/colors';
import { DESKTOP_MIN_WIDTH } from '@/constants/layout';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Text, useWindowDimensions, View } from 'react-native';
import { ProductCard } from '../product/ProductCard';
import { getItemName } from '../product/cardUtils';

const getCategoryPageTitle = (categories: Category[], categoryId: string, language: string): string => {
  return getItemName(categories.find((category) => category.id === categoryId), language) ?? categoryId;
};

const filterProductsByCategory = (products: Product[], categoryId: string): Product[] => {
  return products.filter((product) => product.category === categoryId);
};

const getCategoryGridColumns = (width: number): number => {
  return width >= DESKTOP_MIN_WIDTH ? 4 : 1;
};

interface CategoryProductGridProps {
  categories: Category[];
  categoryId: string;
  products: Product[];
  isLoading: boolean;
}

export function CategoryProductGrid({ categories, categoryId, products, isLoading }: CategoryProductGridProps) {
  const { t, i18n } = useTranslation();
  const { width } = useWindowDimensions();
  const numColumns = getCategoryGridColumns(width);

  const categoryTitle = useMemo(() => getCategoryPageTitle(categories, categoryId, i18n.language), [categories, categoryId, i18n.language]);
  const filteredProducts = useMemo(
    () => filterProductsByCategory(products, categoryId),
    [categoryId, products]
  );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={themeColors.primary[600]} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-4 py-6">
      <Text className="text-2xl font-semibold text-neutral-900">{categoryTitle}</Text>
      <Text className="mt-2 text-sm text-neutral-600">
        {isLoading ? t('category.loading') : t('category.productCount', { count: filteredProducts.length })}
      </Text>

      <FlatList
        key={`category-grid-${numColumns}`}
        data={filteredProducts}
        numColumns={numColumns}
        keyExtractor={(item, index) => item.id ?? `${item.ean}-${index}`}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
        columnWrapperStyle={numColumns > 1 ? { gap: 12, marginBottom: 12 } : undefined}
        ListEmptyComponent={
          isLoading ? null : (
            <Text className="mt-4 text-sm text-neutral-500">{t('category.noProducts')}</Text>
          )
        }
        renderItem={({ item }) => {
          return (
            <ProductCard item={item} numColumns={numColumns} />
          );
        }}
      />
    </View>
  );
}

export { filterProductsByCategory, getCategoryGridColumns, getCategoryPageTitle };
