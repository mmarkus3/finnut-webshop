import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, useWindowDimensions, View } from 'react-native';

const DESKTOP_MIN_WIDTH = 1024;

const getCategoryPageTitle = (categories: Category[], categoryId: string): string => {
  return categories.find((category) => category.id === categoryId)?.name ?? categoryId;
};

const filterProductsByCategory = (products: Product[], categoryId: string): Product[] => {
  return products.filter((product) => product.category === categoryId);
};

const getCategoryGridColumns = (width: number): number => {
  return width >= DESKTOP_MIN_WIDTH ? 4 : 1;
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

  const categoryTitle = useMemo(() => getCategoryPageTitle(categories, categoryId), [categories, categoryId]);
  const filteredProducts = useMemo(
    () => filterProductsByCategory(products, categoryId),
    [categoryId, products]
  );

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
          const description = getProductDescription(item, i18n.language);
          const price = getProductPrice(item);

          return (
            <View
              style={{ width: numColumns === 4 ? '24%' : '100%' }}
              className="rounded-xl border border-neutral-200 bg-white p-3"
              accessibilityRole="summary"
              accessibilityLabel={t('category.productCardA11yLabel', { product: item.name })}
            >
              <Text className="text-base font-semibold text-neutral-900">{item.name}</Text>
              <Text className="mt-1 text-sm text-neutral-700">
                {t('category.priceLabel', {
                  price: price !== null ? price.toFixed(2) : t('category.priceUnavailable'),
                })}
              </Text>
              <Text className="mt-1 text-sm text-neutral-700">
                {t('category.availabilityLabel', { amount: item.amount })}
              </Text>
              <Text numberOfLines={3} className="mt-2 text-sm text-neutral-600">
                {description || t('category.descriptionUnavailable')}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

export {
  getCategoryPageTitle,
  filterProductsByCategory,
  getCategoryGridColumns,
  getProductDescription,
  getProductPrice,
};
