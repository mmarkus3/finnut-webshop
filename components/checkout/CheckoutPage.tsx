import { getProductPrice } from '@/components/product/cardUtils';
import { formatPriceWithCurrency } from '@/components/product/priceFormatting';
import { DESKTOP_MIN_WIDTH } from '@/constants/layout';
import { useCart } from '@/hooks/cart';
import { getDeliveryCost, useDeliveryPricing } from '@/hooks/deliveryPricing';
import { DeliveryPoint, fetchDeliveryPointsByPostalCode } from '@/hooks/deliveryPoints';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from 'react-native';

const isDesktopWidth = (width: number): boolean => width >= DESKTOP_MIN_WIDTH;
const getCheckoutSectionsLayoutClass = (isDesktop: boolean): string => (isDesktop ? 'flex-row items-start' : 'flex-col');

export function CheckoutPage() {
  const { t, i18n } = useTranslation();
  useLocalSearchParams<{ orderId?: string }>();
  const { width } = useWindowDimensions();
  const isDesktop = isDesktopWidth(width);
  const { items, totalPrice, vatAmount } = useCart();
  const { pricing } = useDeliveryPricing();
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address_street: '',
    address_city: '',
    address_zip: '',
  });
  const [deliveryPoints, setDeliveryPoints] = useState<DeliveryPoint[]>([]);
  const [selectedDeliveryPointId, setSelectedDeliveryPointId] = useState<string | null>(null);
  const [isLoadingDeliveryPoints, setIsLoadingDeliveryPoints] = useState(false);
  const [deliveryPointsError, setDeliveryPointsError] = useState<string | null>(null);

  const summaryWithoutVat = Math.max(0, totalPrice - vatAmount);
  const deliveryCost = getDeliveryCost(totalPrice, pricing);

  const loadDeliveryPoints = async () => {
    try {
      setDeliveryPointsError(null);
      setIsLoadingDeliveryPoints(true);
      setSelectedDeliveryPointId(null);

      const points = await fetchDeliveryPointsByPostalCode(customer.address_zip);
      setDeliveryPoints(points);
    } catch {
      setDeliveryPointsError(t('checkout.deliveryPointsError'));
      setDeliveryPoints([]);
    } finally {
      setIsLoadingDeliveryPoints(false);
    }
  };

  const hasPostalCode = customer.address_zip.trim().length > 0;

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="text-2xl font-semibold text-neutral-900">{t('checkout.title')}</Text>

      <View className={`mt-4 gap-4 ${getCheckoutSectionsLayoutClass(isDesktop)}`}>
        <View className={isDesktop ? 'flex-1 rounded-xl border border-neutral-200 p-4' : 'rounded-xl border border-neutral-200 p-4'}>
          <Text className="text-lg font-semibold text-neutral-900">{t('checkout.customerInfoTitle')}</Text>

          <TextInput value={customer.firstname} onChangeText={(v) => setCustomer((p) => ({ ...p, firstname: v }))} placeholder={t('checkout.firstnameLabel')} className="mt-3 rounded-lg border border-neutral-300 px-3 py-2" />
          <TextInput value={customer.lastname} onChangeText={(v) => setCustomer((p) => ({ ...p, lastname: v }))} placeholder={t('checkout.lastnameLabel')} className="mt-2 rounded-lg border border-neutral-300 px-3 py-2" />
          <TextInput value={customer.email} onChangeText={(v) => setCustomer((p) => ({ ...p, email: v }))} placeholder={t('checkout.emailLabel')} keyboardType="email-address" className="mt-2 rounded-lg border border-neutral-300 px-3 py-2" />
          <TextInput value={customer.address_street} onChangeText={(v) => setCustomer((p) => ({ ...p, address_street: v }))} placeholder={t('checkout.addressStreetLabel')} className="mt-2 rounded-lg border border-neutral-300 px-3 py-2" />
          <TextInput value={customer.address_zip} onChangeText={(v) => setCustomer((p) => ({ ...p, address_zip: v }))} placeholder={t('checkout.addressZipLabel')} className="mt-2 rounded-lg border border-neutral-300 px-3 py-2" />
          <TextInput value={customer.address_city} onChangeText={(v) => setCustomer((p) => ({ ...p, address_city: v }))} placeholder={t('checkout.addressCityLabel')} className="mt-2 rounded-lg border border-neutral-300 px-3 py-2" />

          <View className="mt-4 rounded-lg border border-neutral-200 p-3">
            <Text className="text-base font-semibold text-neutral-900">{t('checkout.deliveryPointsTitle')}</Text>
            <Pressable
              onPress={loadDeliveryPoints}
              disabled={!hasPostalCode || isLoadingDeliveryPoints}
              className={`mt-2 items-center rounded-lg px-3 py-2 ${!hasPostalCode || isLoadingDeliveryPoints ? 'bg-neutral-300' : 'bg-primary-600'}`}
              accessibilityRole="button"
              accessibilityLabel={t('checkout.loadDeliveryPointsButton')}
            >
              <Text className="text-sm font-medium text-white">
                {isLoadingDeliveryPoints ? t('checkout.deliveryPointsLoading') : t('checkout.loadDeliveryPointsButton')}
              </Text>
            </Pressable>

            {deliveryPointsError ? <Text className="mt-2 text-sm text-red-600">{deliveryPointsError}</Text> : null}
            {!isLoadingDeliveryPoints && !deliveryPointsError && deliveryPoints.length === 0 ? (
              <Text className="mt-2 text-sm text-neutral-600">{t('checkout.deliveryPointsEmpty')}</Text>
            ) : null}

            <View className="mt-2 gap-2">
              {deliveryPoints.map((point) => {
                const isSelected = selectedDeliveryPointId === point.id;
                return (
                  <Pressable
                    key={point.id}
                    onPress={() => setSelectedDeliveryPointId(point.id)}
                    className={`rounded-lg border px-3 py-2 ${isSelected ? 'border-primary-600 bg-primary-50' : 'border-neutral-300'}`}
                    accessibilityRole="button"
                    accessibilityLabel={t('checkout.deliveryPointOptionA11yLabel', { point: point.name })}
                  >
                    <Text className={`text-sm font-medium ${isSelected ? 'text-primary-700' : 'text-neutral-900'}`}>{point.name}</Text>
                    <Text className="mt-1 text-xs text-neutral-600">{point.addressLine}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        <View className={isDesktop ? 'w-96 rounded-xl bg-neutral-50 p-4' : 'rounded-xl bg-neutral-50 p-4'}>
          <Text className="text-lg font-semibold text-neutral-900">{t('cart.orderSummaryTitle')}</Text>

          <View className="mt-3 gap-2">
            {items.map((item, index) => {
              const price = getProductPrice(item.product);
              return (
                <View key={`${item.product.id ?? item.product.ean}-${index}`} className="flex-row items-center justify-between">
                  <Text className="text-sm text-neutral-800">{item.product.name} x {item.quantity}</Text>
                  <Text className="text-sm text-neutral-700">{price !== null ? formatPriceWithCurrency(price * item.quantity, i18n.language) : t('category.priceUnavailable')}</Text>
                </View>
              );
            })}
          </View>

          <View className="my-4 h-px bg-neutral-200" />

          <View className="gap-2">
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
              <Text className="text-sm text-neutral-900">
                {deliveryCost.cost === null
                  ? t('cart.deliveryValuePlaceholder')
                  : deliveryCost.isFree
                    ? t('delivery.free')
                    : formatPriceWithCurrency(deliveryCost.cost, i18n.language)}
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-neutral-700">{t('cart.totalWithoutVatLabel')}</Text>
              <Text className="text-sm text-neutral-900">{formatPriceWithCurrency(summaryWithoutVat, i18n.language)}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-neutral-900">{t('cart.totalLabelText')}</Text>
              <Text className="text-sm font-semibold text-neutral-900">{formatPriceWithCurrency(totalPrice, i18n.language)}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export { getCheckoutSectionsLayoutClass, isDesktopWidth };
