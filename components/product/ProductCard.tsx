import { useCart } from '@/hooks/cart';
import { Product } from '@/types/product';
import { Asset } from 'expo-asset';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { getAvailabilityStatusMeta } from './availabilityStatus';
import { getFirstUsableProductImage, getItemName, getProductDescription, getProductIdentifier, getProductPriceDisplay } from './cardUtils';
import { formatPriceWithCurrency } from './priceFormatting';

const placeholderImageSource = { uri: Asset.fromModule(require('../../assets/images/fallback.png')).uri };

interface ProductCardProps {
  item: Product;
  numColumns?: number;
  width?: string;
}

export function ProductCard({ item, numColumns, width }: ProductCardProps) {
  const { addItem, canAddItem } = useCart();
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const description = getProductDescription(item, i18n.language);
  const priceDisplay = getProductPriceDisplay(item);
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
    <View className={`flex justify-between rounded-xl border border-neutral-200 bg-white p-3 min-h-[350px] ${width}`} style={{ width: width ? null : numColumns === 4 ? '24%' : '100%' }}>
      <Pressable
        onPress={openProduct}
        accessibilityRole="button"
        accessibilityLabel={t('category.productCardA11yLabel', { product: getItemName(item, i18n.language) })}
      >
        <Image
          source={firstImage ? { uri: firstImage } : placeholderImageSource}
          defaultSource={placeholderImageSource}
          style={{ resizeMode: 'contain' }}
          className="h-32 w-full rounded-lg bg-neutral-100"
        />
        <Text className="mt-2 text-base font-semibold text-neutral-900">{getItemName(item, i18n.language)}</Text>
        <View className="mt-1">
          {priceDisplay.hasDiscount && priceDisplay.discountPrice !== null ? (
            <>
              <View className="flex-row items-center gap-2 mb-1">
                <Text className="text-sm font-semibold text-red-600">
                  {formatPriceWithCurrency(priceDisplay.discountPrice, i18n.language)}
                </Text>
                {priceDisplay.retailPrice !== null ? (
                  <Text className="text-xs text-neutral-500 line-through">
                    {formatPriceWithCurrency(priceDisplay.retailPrice, i18n.language)}
                  </Text>
                ) : null}
              </View>
              {priceDisplay.lowestRetailPriceLast30Days !== null ? (
                <Text className="text-xs text-neutral-600">
                  {t('product.lowestRetailPriceLast30DaysLabel')}:<br />{formatPriceWithCurrency(priceDisplay.lowestRetailPriceLast30Days, i18n.language)}
                </Text>
              ) : null}
            </>
          ) : (
            <Text className="text-sm text-neutral-700">
              {t('category.priceLabel', {
                price: priceDisplay.retailPrice !== null
                  ? formatPriceWithCurrency(priceDisplay.retailPrice, i18n.language)
                  : t('category.priceUnavailable'),
              })}
            </Text>
          )}
        </View>
        <View className={`mt-2 self-start rounded-full px-2 py-1 ${availabilityStatus.bgClassName}`}>
          <Text className={`text-xs font-medium ${availabilityStatus.textClassName}`}>{t(availabilityStatus.labelKey)}</Text>
        </View>
        <View className="mt-2">
          <Text numberOfLines={3} ellipsizeMode="tail" className="text-sm text-neutral-600">
            {description || ''}
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => addItem(item)}
        disabled={!canAdd}
        className={`mt-3 items-center rounded-lg px-3 py-2 ${canAdd ? 'bg-primary-600' : 'bg-neutral-300'}`}
        accessibilityRole="button"
        accessibilityLabel={t('cart.addA11yLabel', { product: getItemName(item, i18n.language) })}
      >
        <Text className="text-sm font-medium text-white">{t('cart.addButton')}</Text>
      </Pressable>
    </View>
  );
}