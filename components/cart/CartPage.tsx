import { getFirstUsableProductImage, getProductIdentifier, getProductPrice } from '@/components/product/cardUtils';
import { formatPriceWithCurrency } from '@/components/product/priceFormatting';
import { DESKTOP_MIN_WIDTH } from '@/constants/layout';
import { useCart } from '@/hooks/cart';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Asset } from 'expo-asset';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, Text, useWindowDimensions, View } from 'react-native';

const placeholderImageSource = { uri: Asset.fromModule(require('../../assets/images/fallback.png')).uri };

const isDesktopWidth = (width: number): boolean => width >= DESKTOP_MIN_WIDTH;

export function CartPage() {
  const { t, i18n } = useTranslation();
  const { width } = useWindowDimensions();
  const isDesktop = isDesktopWidth(width);
  const { items, totalPrice, vatAmount, incrementItem, decrementItem, removeItem, clearCart } = useCart();
  const summaryWithoutVat = Math.max(0, totalPrice - vatAmount);

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-white px-4 py-6 items-center justify-center">
        <Text className="text-2xl font-semibold text-neutral-900">{t('cart.title')}</Text>
        <Text className="mt-3 text-sm text-neutral-600">{t('cart.empty')}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-4 py-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-semibold text-neutral-900">{t('cart.title')}</Text>
        <Pressable onPress={clearCart} accessibilityRole="button" accessibilityLabel={t('cart.clearA11yLabel')}>
          <Text className="text-sm font-medium text-red-600">{t('cart.clearButton')}</Text>
        </Pressable>
      </View>

      <View
        className={`mt-4 gap-6 ${isDesktop ? 'flex-row items-start' : 'flex-col'}`}
        accessibilityLabel={isDesktop ? t('cart.desktopLayoutA11yLabel') : t('cart.mobileLayoutA11yLabel')}
      >
        <View className={isDesktop ? 'flex-1 gap-3' : 'gap-3'} accessibilityLabel={t('cart.itemsSectionA11yLabel')}>
          {items.map((item) => {
            const productId = getProductIdentifier(item.product);
            const price = getProductPrice(item.product);
            const firstImage = getFirstUsableProductImage(item.product);
            const canIncrement = item.quantity < item.product.amount;

            return (
              <View key={productId} className="rounded-xl border border-neutral-200 p-3">
                <View className="md:flex md:flex-row justify-between">
                  <View className="flex-row gap-3">
                    <Image
                      source={firstImage ? { uri: firstImage } : placeholderImageSource}
                      defaultSource={placeholderImageSource}
                      style={{ resizeMode: 'contain' }}
                      className="h-16 w-16 rounded-md bg-neutral-100"
                      accessibilityRole="image"
                      accessibilityLabel={t('cart.imageA11yLabel', { product: item.product.name })}
                    />

                    <View className="flex-1">
                      <Text className="text-base font-semibold text-neutral-900" ellipsizeMode="tail">{item.product.name}</Text>
                      <Text className="mt-1 text-sm text-neutral-600">
                        {t('cart.priceLabel', {
                          price: price !== null ? formatPriceWithCurrency(price, i18n.language) : t('category.priceUnavailable'),
                        })}
                      </Text>
                    </View>
                  </View>

                  <View className="mt-3 flex-row items-center gap-2">
                    <Pressable
                      onPress={() => decrementItem(productId)}
                      className="rounded-md border border-neutral-300 px-3 py-1"
                      accessibilityRole="button"
                      accessibilityLabel={t('cart.decreaseA11yLabel', { product: item.product.name })}
                    >
                      <Text className="text-base text-neutral-900">-</Text>
                    </Pressable>
                    <Text className="min-w-8 text-center text-sm text-neutral-900">{item.quantity}</Text>
                    <Pressable
                      onPress={() => incrementItem(productId)}
                      disabled={!canIncrement}
                      className={`rounded-md px-3 py-1 ${canIncrement ? 'border border-neutral-300' : 'border border-neutral-200 bg-neutral-100'}`}
                      accessibilityRole="button"
                      accessibilityLabel={t('cart.increaseA11yLabel', { product: item.product.name })}
                    >
                      <Text className={`text-base ${canIncrement ? 'text-neutral-900' : 'text-neutral-400'}`}>+</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => removeItem(productId)}
                      className="ml-2"
                      accessibilityRole="button"
                      accessibilityLabel={t('cart.removeA11yLabel', { product: item.product.name })}
                    >
                      <FontAwesome name="trash-o" size={24}></FontAwesome>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View className={`${isDesktop ? 'w-96' : 'w-full'} rounded-xl bg-neutral-50 p-4`} accessibilityLabel={t('cart.summarySectionA11yLabel')}>
          <Text className="text-lg font-semibold text-neutral-900">{t('cart.orderSummaryTitle')}</Text>

          <View className="mt-4 gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-neutral-700">{t('cart.subtotalLabel')}</Text>
              <Text className="text-sm text-neutral-900">{formatPriceWithCurrency(totalPrice, i18n.language)}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-neutral-700">{t('cart.vatIncludedLabel')}</Text>
              <Text className="text-sm text-neutral-900">{formatPriceWithCurrency(vatAmount, i18n.language)}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-neutral-700">{t('cart.deliveryLabel')}</Text>
              <Text className="text-sm text-neutral-900">{t('cart.deliveryValuePlaceholder')}</Text>
            </View>
          </View>

          <View className="my-4 h-px bg-neutral-200" />

          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-neutral-900">{t('cart.totalLabelText')}</Text>
              <Text className="text-sm font-semibold text-neutral-900">{formatPriceWithCurrency(totalPrice, i18n.language)}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-neutral-700">{t('cart.totalWithoutVatLabel')}</Text>
              <Text className="text-sm text-neutral-900">{formatPriceWithCurrency(summaryWithoutVat, i18n.language)}</Text>
            </View>
          </View>

          <Pressable
            className="mt-4 items-center rounded-lg bg-primary-600 px-3 py-3"
            accessibilityRole="button"
            accessibilityLabel={t('cart.checkoutButton')}
          >
            <Text className="text-sm font-medium text-white">{t('cart.checkoutButton')}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export { isDesktopWidth };
