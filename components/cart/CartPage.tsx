import { getFirstUsableProductImage, getProductIdentifier } from '@/components/product/cardUtils';
import { formatPriceWithCurrency } from '@/components/product/priceFormatting';
import { DESKTOP_MIN_WIDTH } from '@/constants/layout';
import { clearActiveOrderId, getActiveOrderId, saveActiveOrderId } from '@/hooks/activeOrder';
import { useCart } from '@/hooks/cart';
import { useCheckoutDiscount } from '@/hooks/checkoutDiscount';
import { syncOrderForCheckout } from '@/hooks/checkoutOrder';
import { getDeliveryCost, useDeliveryPricing } from '@/hooks/deliveryPricing';
import { getCartDiscountTotals, getDiscountLinePricing } from '@/hooks/discountPricing';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Asset } from 'expo-asset';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, Text, TextInput, useWindowDimensions, View } from 'react-native';

const placeholderImageSource = { uri: Asset.fromModule(require('../../assets/images/fallback.png')).uri };
const paymentBannerSource = { uri: 'https://static.vismapay.com/pay_banners/row.png' };

const isDesktopWidth = (width: number): boolean => width >= DESKTOP_MIN_WIDTH;

export function CartPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = isDesktopWidth(width);
  const { items, totalPrice, vatAmount, incrementItem, decrementItem, removeItem, clearCart } = useCart();
  const {
    discountCodeInput,
    setDiscountCodeInput,
    activeDiscountCode,
    applyDiscountCode,
    clearDiscountCode,
    discountPercentagesByProduct,
    isApplyingDiscount,
    discountError,
  } = useCheckoutDiscount();
  const { pricing } = useDeliveryPricing();
  const discountTotals = getCartDiscountTotals(items, discountPercentagesByProduct);
  const hasActiveDiscount = activeDiscountCode !== null && Object.keys(discountPercentagesByProduct).length > 0;
  const subtotalToUse = hasActiveDiscount ? discountTotals.subtotalDiscounted : totalPrice;
  const vatToUse = hasActiveDiscount ? discountTotals.vatDiscounted : vatAmount;
  const summaryWithoutVat = Math.max(0, subtotalToUse - vatToUse);
  const deliveryCost = getDeliveryCost(subtotalToUse, pricing);
  const summaryTotalWithDelivery = deliveryCost.cost === null
    ? subtotalToUse
    : subtotalToUse + deliveryCost.cost;
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const proceedToCheckout = async () => {
    const activeOrderId = getActiveOrderId();
    // TODO: clearActiveOrderId should be called when order is completed or canceled in checkout flow.
    try {
      setCheckoutError(null);
      setIsCreatingOrder(true);
      const order = await syncOrderForCheckout(items, activeOrderId, undefined, activeDiscountCode ?? undefined);
      if (!order.id) {
        throw new Error('Missing order id from backend response');
      }

      if (activeOrderId && order.id !== activeOrderId) {
        clearActiveOrderId();
      }
      saveActiveOrderId(order.id);
      router.push({ pathname: '/checkout', params: { orderId: order.id } });
    } catch {
      setCheckoutError(t('checkout.orderCreateError'));
    } finally {
      setIsCreatingOrder(false);
    }
  };

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
            const linePricing = getDiscountLinePricing(item, discountPercentagesByProduct);
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
                      {hasActiveDiscount ? (
                        <View className="mt-1">
                          <Text className="text-sm font-semibold text-red-600">
                            {linePricing.unitDiscounted !== null ? formatPriceWithCurrency(linePricing.unitDiscounted, i18n.language) : t('category.priceUnavailable')}
                          </Text>
                          <Text className="text-xs text-neutral-500 line-through">
                            {linePricing.unitOriginal !== null ? formatPriceWithCurrency(linePricing.unitOriginal, i18n.language) : t('category.priceUnavailable')}
                          </Text>
                        </View>
                      ) : (
                        <Text className="mt-1 text-sm text-neutral-600">
                          {t('cart.priceLabel', {
                            price: linePricing.unitOriginal !== null ? formatPriceWithCurrency(linePricing.unitOriginal, i18n.language) : t('category.priceUnavailable'),
                          })}
                        </Text>
                      )}
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
              <View className="items-end">
                <Text className="text-sm text-neutral-900">{formatPriceWithCurrency(subtotalToUse, i18n.language)}</Text>
                {hasActiveDiscount ? <Text className="text-xs text-neutral-500 line-through">{formatPriceWithCurrency(discountTotals.subtotalOriginal, i18n.language)}</Text> : null}
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-neutral-700">{t('cart.vatIncludedLabel')}</Text>
              <Text className="text-sm text-neutral-900">{formatPriceWithCurrency(vatToUse, i18n.language)}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-neutral-700">{t('cart.deliveryLabel')}</Text>
              <Text className="text-sm text-neutral-900">
                {deliveryCost.cost === null
                  ? t('cart.deliveryValuePlaceholder')
                  : deliveryCost.isFree
                    ? t('delivery.free')
                    : formatPriceWithCurrency(deliveryCost.cost, i18n.language)}
              </Text>
            </View>
          </View>

          <View className="my-4 h-px bg-neutral-200" />

          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-neutral-900">{t('cart.totalLabelText')}</Text>
              <View className="items-end">
                <Text className="text-sm font-semibold text-neutral-900">{formatPriceWithCurrency(summaryTotalWithDelivery, i18n.language)}</Text>
                {hasActiveDiscount ? <Text className="text-xs text-neutral-500 line-through">{formatPriceWithCurrency(discountTotals.subtotalOriginal, i18n.language)}</Text> : null}
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-neutral-700">{t('cart.totalWithoutVatLabel')}</Text>
              <Text className="text-sm text-neutral-900">{formatPriceWithCurrency(summaryWithoutVat, i18n.language)}</Text>
            </View>
          </View>

          <View className="my-4 h-px bg-neutral-200" />

          <View>
            <Text className="mb-1 text-sm text-neutral-700">{t('discount.codeLabel')}</Text>
            <View className="flex-row gap-2">
              <TextInput
                value={discountCodeInput}
                onChangeText={setDiscountCodeInput}
                placeholder={t('discount.codePlaceholder')}
                className="rounded-lg border border-neutral-300 bg-white px-3 py-2 w-full"
              />
              <View className="flex-row gap-2">
                <Pressable
                  onPress={applyDiscountCode}
                  disabled={isApplyingDiscount}
                  className={`rounded-lg px-3 py-2 ${isApplyingDiscount ? 'bg-neutral-300' : 'bg-primary-600'}`}
                  accessibilityRole="button"
                  accessibilityLabel={t('discount.applyButton')}
                >
                  <Text className="text-sm font-medium text-white">{t('discount.applyButton')}</Text>
                </Pressable>
                {activeDiscountCode ? (
                  <Pressable
                    onPress={clearDiscountCode}
                    className="rounded-lg border border-neutral-300 px-3 py-2"
                    accessibilityRole="button"
                    accessibilityLabel={t('discount.clearButton')}
                  >
                    <Text className="text-sm text-neutral-800">{t('discount.clearButton')}</Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
            {activeDiscountCode ? <Text className="mt-1 text-xs text-green-700">{t('discount.activeCodeLabel', { code: activeDiscountCode })}</Text> : null}
            {discountError ? <Text className="mt-1 text-xs text-red-600">{t('discount.invalidCodeError')}</Text> : null}
          </View>

          <Pressable
            className={`mt-4 items-center rounded-lg px-3 py-3 ${isCreatingOrder ? 'bg-neutral-300' : 'bg-primary-600'}`}
            accessibilityRole="button"
            accessibilityLabel={t('cart.checkoutButton')}
            onPress={proceedToCheckout}
            disabled={isCreatingOrder}
          >
            <Text className="text-sm font-medium text-white">{isCreatingOrder ? t('checkout.orderCreateLoading') : t('cart.checkoutButton')}</Text>
          </Pressable>
          {checkoutError ? <Text className="mt-2 text-sm text-red-600">{checkoutError}</Text> : null}
        </View>
      </View>

      <View className="mt-16 items-center">
        <Image
          source={paymentBannerSource}
          style={{ resizeMode: 'contain' }}
          className="h-12 w-full"
          accessibilityRole="image"
          accessibilityLabel="Visma Pay payment methods"
        />
      </View>
    </View>
  );
}

export { isDesktopWidth };
