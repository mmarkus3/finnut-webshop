import {
  getAvailabilityStatusMeta,
} from '@/components/product/availabilityStatus';
import {
  getFirstUsableProductImage,
  getProductDescription,
  getProductIdentifier,
  getProductPrice,
} from '@/components/product/cardUtils';
import { themeColors } from '@/constants/colors';
import { useCart } from '@/hooks/cart';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { Asset } from 'expo-asset';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Image, Pressable, Text, useWindowDimensions, View } from 'react-native';

const DESKTOP_MIN_WIDTH = 1024;
const placeholderImageSource = { uri: Asset.fromModule(require('../../assets/images/fallback.png')).uri };

const getCategoryPageTitle = (categories: Category[], categoryId: string): string => {
  return categories.find((category) => category.id === categoryId)?.name ?? categoryId;
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
  const router = useRouter();
  const { addItem, canAddItem } = useCart();
  const { width } = useWindowDimensions();
  const numColumns = getCategoryGridColumns(width);

  const categoryTitle = useMemo(() => getCategoryPageTitle(categories, categoryId), [categories, categoryId]);
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
          const description = getProductDescription(item, i18n.language);
          const price = getProductPrice(item);
          const firstImage = getFirstUsableProductImage(item);
          const canAdd = canAddItem(item);
          const availabilityStatus = getAvailabilityStatusMeta(item.amount);

          const openProduct = () => {
            router.push({
              pathname: '/product/[productId]',
              params: { productId: getProductIdentifier(item) },
            });
          };

          return (
            <View className="rounded-xl border border-neutral-200 bg-white p-3" style={{ width: numColumns === 4 ? '24%' : '100%' }}>
              <Pressable
                onPress={openProduct}
                accessibilityRole="button"
                accessibilityLabel={t('category.productCardA11yLabel', { product: item.name })}
              >
                <Image
                  source={firstImage ? { uri: firstImage } : placeholderImageSource}
                  defaultSource={placeholderImageSource}
                  style={{ resizeMode: 'contain' }}
                  className="h-32 w-full rounded-lg bg-neutral-100"
                />
                <Text className="mt-2 text-base font-semibold text-neutral-900">{item.name}</Text>
                <Text className="mt-1 text-sm text-neutral-700">
                  {t('category.priceLabel', {
                    price: price !== null ? price.toFixed(2) : t('category.priceUnavailable'),
                  })}
                </Text>
                <View className={`mt-2 self-start rounded-full px-2 py-1 ${availabilityStatus.bgClassName}`}>
                  <Text className={`text-xs font-medium ${availabilityStatus.textClassName}`}>{t(availabilityStatus.labelKey)}</Text>
                </View>
                <Text numberOfLines={3} ellipsizeMode="tail" className="mt-2 text-sm text-neutral-600">
                  {description || ''}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => addItem(item)}
                disabled={!canAdd}
                className={`mt-3 items-center rounded-lg px-3 py-2 ${canAdd ? 'bg-primary-600' : 'bg-neutral-300'}`}
                accessibilityRole="button"
                accessibilityLabel={t('cart.addA11yLabel', { product: item.name })}
              >
                <Text className="text-sm font-medium text-white">{t('cart.addButton')}</Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}

export { filterProductsByCategory, getCategoryGridColumns, getCategoryPageTitle };
