import {
  getFirstUsableProductImage,
  getProductDescription,
  getProductPrice,
  resolveProductByIdentifier,
} from '@/components/product/cardUtils';
import { Product } from '@/types/product';
import { Asset } from 'expo-asset';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native';

interface ProductDetailPageProps {
  productId: string;
  products: Product[];
  isLoading: boolean;
}

const DESKTOP_MIN_WIDTH = 1024;
const placeholderImageSource = { uri: Asset.fromModule(require('../../assets/images/fallback.png')).uri };

const isDesktopWidth = (width: number): boolean => width >= DESKTOP_MIN_WIDTH;

export function ProductDetailPage({ productId, products, isLoading }: ProductDetailPageProps) {
  const { t, i18n } = useTranslation();
  const { width } = useWindowDimensions();
  const isDesktop = isDesktopWidth(width);

  const product = useMemo(() => resolveProductByIdentifier(products, productId), [productId, products]);

  if (isLoading) {
    return (
      <View className="flex-1 bg-white px-4 py-6">
        <Text className="text-sm text-neutral-600">{t('product.loading')}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 bg-white px-4 py-6">
        <Text className="text-2xl font-semibold text-neutral-900">{t('product.notFoundTitle')}</Text>
        <Text className="mt-2 text-sm text-neutral-600">{t('product.notFoundDescription')}</Text>
      </View>
    );
  }

  const imageUri = getFirstUsableProductImage(product);
  const description = getProductDescription(product, i18n.language);
  const price = getProductPrice(product);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16 }}>
      <View className={isDesktop ? 'flex-row gap-6' : 'flex-col gap-4'}>
        <View className={isDesktop ? 'w-1/2' : 'w-full'}>
          <Image
            source={imageUri ? { uri: imageUri } : placeholderImageSource}
            defaultSource={placeholderImageSource}
            className={isDesktop ? 'h-[520px] w-full rounded-xl bg-neutral-100' : 'h-80 w-full rounded-xl bg-neutral-100'}
            accessibilityRole="image"
            accessibilityLabel={t('product.imageA11yLabel', { product: product.name })}
          />
        </View>

        <View className={isDesktop ? 'w-1/2 gap-2' : 'w-full gap-2'}>
          <Text className="text-2xl font-semibold text-neutral-900">{product.name}</Text>
          <Text className="text-sm text-neutral-700">
            {t('category.priceLabel', {
              price: price !== null ? price.toFixed(2) : t('category.priceUnavailable'),
            })}
          </Text>
          <Text className="text-sm text-neutral-700">
            {t('category.availabilityLabel', { amount: product.amount })}
          </Text>
          <Text className="text-sm text-neutral-700">{t('product.eanLabel', { ean: product.ean })}</Text>
          <Text className="mt-2 text-sm leading-6 text-neutral-600">
            {description || t('category.descriptionUnavailable')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export { isDesktopWidth };
