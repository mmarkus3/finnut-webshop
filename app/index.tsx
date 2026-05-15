import { HomeCategoryLinksRow } from '@/components/home/HomeCategoryLinksRow';
import { HomeCategoryProductSections } from '@/components/home/HomeCategoryProductSections';
import { themeColors } from '@/constants/colors';
import { useCategories } from '@/hooks/categories';
import { useProducts } from '@/hooks/products';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { t } = useTranslation();
  const { categories, isLoading: isCategoriesLoading } = useCategories();
  const { products, isLoading: isProductsLoading } = useProducts();

  return (
    <View className="flex-1 bg-white">
      <View className="pt-4">
        <HomeCategoryLinksRow categories={categories} />
      </View>
      <View className="px-4 pt-4">
        {isCategoriesLoading || isProductsLoading ? (
          <View className="flex-1 items-center justify-center bg-white">
            <ActivityIndicator size="large" color={themeColors.primary[600]} />
          </View>
        ) : null}
      </View>

      <HomeCategoryProductSections categories={categories} products={products} />
    </View>
  );
}
