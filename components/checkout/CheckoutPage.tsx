import { getProductPrice } from '@/components/product/cardUtils';
import { formatPriceWithCurrency } from '@/components/product/priceFormatting';
import { DESKTOP_MIN_WIDTH } from '@/constants/layout';
import { useCart } from '@/hooks/cart';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TextInput, useWindowDimensions, View } from 'react-native';

const isDesktopWidth = (width: number): boolean => width >= DESKTOP_MIN_WIDTH;
const getCheckoutSectionsLayoutClass = (isDesktop: boolean): string => (isDesktop ? 'flex-row items-start' : 'flex-col');

export function CheckoutPage() {
  const { t, i18n } = useTranslation();
  useLocalSearchParams<{ orderId?: string }>();
  const { width } = useWindowDimensions();
  const isDesktop = isDesktopWidth(width);
  const { items, totalPrice, vatAmount } = useCart();
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address_street: '',
    address_city: '',
    address_zip: '',
  });

  const summaryWithoutVat = Math.max(0, totalPrice - vatAmount);

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
          <TextInput value={customer.address_city} onChangeText={(v) => setCustomer((p) => ({ ...p, address_city: v }))} placeholder={t('checkout.addressCityLabel')} className="mt-2 rounded-lg border border-neutral-300 px-3 py-2" />
          <TextInput value={customer.address_zip} onChangeText={(v) => setCustomer((p) => ({ ...p, address_zip: v }))} placeholder={t('checkout.addressZipLabel')} className="mt-2 rounded-lg border border-neutral-300 px-3 py-2" />
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
