import { getProductIdentifier, getProductPrice } from '@/components/product/cardUtils';
import { useCart } from '@/hooks/cart';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

export function CartPage() {
  const { t } = useTranslation();
  const { items, totalPrice, incrementItem, decrementItem, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-white px-4 py-6">
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

      <View className="mt-4 gap-3">
        {items.map((item) => {
          const productId = getProductIdentifier(item.product);
          const price = getProductPrice(item.product);
          const canIncrement = item.quantity < item.product.amount;

          return (
            <View key={productId} className="rounded-xl border border-neutral-200 p-3">
              <Text className="text-base font-semibold text-neutral-900">{item.product.name}</Text>
              <Text className="mt-1 text-sm text-neutral-600">{t('cart.eanLabel', { ean: item.product.ean })}</Text>
              <Text className="mt-1 text-sm text-neutral-600">
                {t('cart.priceLabel', {
                  price: price !== null ? price.toFixed(2) : t('category.priceUnavailable'),
                })}
              </Text>

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
                  <Text className="text-sm text-red-600">{t('cart.removeButton')}</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>

      <View className="mt-6 rounded-xl bg-neutral-50 p-3">
        <Text className="text-sm font-semibold text-neutral-900">{t('cart.totalLabel', { total: totalPrice.toFixed(2) })}</Text>
      </View>
    </View>
  );
}
