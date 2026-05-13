import { HomeCategoryLinksRow } from '@/components/home/HomeCategoryLinksRow';
import { useCategories } from '@/hooks/categories';
import { useProducts } from '@/hooks/products';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export default function Index() {
  const { t } = useTranslation();
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const { products } = useProducts();

  return (
    <View className="flex-1 bg-white">
      <View className="pt-4">
        <HomeCategoryLinksRow categories={categories} />
      </View>
      <View className="px-4 py-6">
        <Text className="text-lg font-semibold text-neutral-900">{t('home.welcome')}</Text>
        <Text className="mt-2 text-sm text-neutral-600">
          {t('home.stats', {
            products: products.length,
            categories: categories.length,
          })}
        </Text>
        {isCategoriesLoading ? (
          <Text className="mt-2 text-xs text-neutral-500">{t('home.loadingCategories')}</Text>
        ) : null}
      </View>
    </View>
  );
}
