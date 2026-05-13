import { useCategories } from '@/hooks/categories';
import { useProducts } from '@/hooks/products';
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export default function CategoryListingScreen() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ categoryId?: string }>();
  const categoryId = params.categoryId ?? '';
  const { categories } = useCategories();
  const { products, isLoading } = useProducts();

  const filteredProducts = useMemo(
    () => products.filter((product) => product.category === categoryId),
    [categoryId, products]
  );

  const categoryName = useMemo(() => categories.find((c) => c.id === categoryId)?.name, [categoryId, categories])

  return (
    <View className="flex-1 bg-white px-4 py-6">
      <Text className="text-lg font-semibold text-neutral-900">
        {categoryName}
      </Text>
      <Text className="mt-2 text-sm text-neutral-600">
        {isLoading
          ? t('category.loading')
          : t('category.productCount', { count: filteredProducts.length })}
      </Text>
    </View>
  );
}
