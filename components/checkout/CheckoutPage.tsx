import { formatPriceWithCurrency } from '@/components/product/priceFormatting';
import { DESKTOP_MIN_WIDTH } from '@/constants/layout';
import { useCart } from '@/hooks/cart';
import { useCheckoutDiscount } from '@/hooks/checkoutDiscount';
import { syncOrderForCheckout } from '@/hooks/checkoutOrder';
import { saveDeliveryMethodToOrder } from '@/hooks/deliveryMethodPersistence';
import { DeliveryPoint, fetchDeliveryPointsByPostalCode } from '@/hooks/deliveryPoints';
import { getDeliveryCost, useDeliveryPricing } from '@/hooks/deliveryPricing';
import { getCartDiscountTotals, getDiscountLinePricing } from '@/hooks/discountPricing';
import { fetchPaymentMethods, PaymentMethod } from '@/hooks/paymentMethods';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from 'react-native';

const isDesktopWidth = (width: number): boolean => width >= DESKTOP_MIN_WIDTH;
const getCheckoutSectionsLayoutClass = (isDesktop: boolean): string => (isDesktop ? 'flex-row items-start' : 'flex-col');

const isCustomerInfoComplete = (customer: {
  firstname: string;
  lastname: string;
  email: string;
  address_street: string;
  address_city: string;
  address_zip: string;
  phone: string;
}): boolean => {
  return [
    customer.firstname,
    customer.lastname,
    customer.email,
    customer.address_street,
    customer.address_city,
    customer.address_zip,
    customer.phone,
  ].every((value) => value.trim().length > 0);
};

export function CheckoutPage() {
  const { t, i18n } = useTranslation();
  const { orderId } = useLocalSearchParams<{ orderId?: string }>();
  const { width } = useWindowDimensions();
  const isDesktop = isDesktopWidth(width);
  const { items, totalPrice, vatAmount } = useCart();
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
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address_street: '',
    address_city: '',
    address_zip: '',
    phone: '',
  });
  const [deliveryPoints, setDeliveryPoints] = useState<DeliveryPoint[]>([]);
  const [selectedDeliveryPointId, setSelectedDeliveryPointId] = useState<string | null>(null);
  const [isLoadingDeliveryPoints, setIsLoadingDeliveryPoints] = useState(false);
  const [deliveryPointsError, setDeliveryPointsError] = useState<string | null>(null);
  const [isSavingDeliveryMethod, setIsSavingDeliveryMethod] = useState(false);
  const [deliveryMethodError, setDeliveryMethodError] = useState<string | null>(null);
  const [isPaymentStep, setIsPaymentStep] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoadingPaymentMethods, setIsLoadingPaymentMethods] = useState(false);
  const [paymentMethodsError, setPaymentMethodsError] = useState<string | null>(null);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string | null>(null);

  const discountTotals = getCartDiscountTotals(items, discountPercentagesByProduct);
  const hasActiveDiscount = activeDiscountCode !== null && Object.keys(discountPercentagesByProduct).length > 0;
  const subtotalToUse = hasActiveDiscount ? discountTotals.subtotalDiscounted : totalPrice;
  const vatToUse = hasActiveDiscount ? discountTotals.vatDiscounted : vatAmount;
  const summaryWithoutVat = Math.max(0, subtotalToUse - vatToUse);
  const deliveryCost = getDeliveryCost(subtotalToUse, pricing);
  const summaryTotalWithDelivery = deliveryCost.cost === null
    ? subtotalToUse
    : subtotalToUse + deliveryCost.cost;

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

  const loadPaymentMethods = async () => {
    try {
      setPaymentMethodsError(null);
      setIsLoadingPaymentMethods(true);
      const methods = await fetchPaymentMethods();
      setPaymentMethods(methods);
    } catch {
      setPaymentMethodsError(t('checkout.paymentMethodsError'));
      setPaymentMethods([]);
    } finally {
      setIsLoadingPaymentMethods(false);
    }
  };

  const hasPostalCode = customer.address_zip.trim().length > 0;
  const canProceedToPayment = isCustomerInfoComplete(customer) && selectedDeliveryPointId !== null;

  const selectDeliveryPoint = async (pointId: string) => {
    if (!orderId || isSavingDeliveryMethod) {
      setDeliveryMethodError(t('checkout.deliveryMethodSaveError'));
      return;
    }

    try {
      setDeliveryMethodError(null);
      setIsSavingDeliveryMethod(true);
      await saveDeliveryMethodToOrder(orderId, pointId);
      setSelectedDeliveryPointId(pointId);
    } catch {
      setDeliveryMethodError(t('checkout.deliveryMethodSaveError'));
    } finally {
      setIsSavingDeliveryMethod(false);
    }
  };

  const goToPaymentStep = async () => {
    if (!canProceedToPayment || isLoadingPaymentMethods) {
      return;
    }

    setIsPaymentStep(true);
    await loadPaymentMethods();
  };

  const applyDiscountAndSyncOrder = async () => {
    const applied = await applyDiscountCode();
    if (!orderId) {
      return;
    }

    const nextDiscount = applied ? discountCodeInput.trim() : undefined;
    try {
      await syncOrderForCheckout(items, orderId, undefined, nextDiscount);
    } catch {
      // Keep UI non-blocking: lookup result feedback is handled by hook error state.
    }
  };

  const clearDiscountAndSyncOrder = async () => {
    clearDiscountCode();
    if (!orderId) {
      return;
    }
    try {
      await syncOrderForCheckout(items, orderId, undefined, undefined);
    } catch {
      // Keep UI non-blocking for clear path as well.
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="text-2xl font-semibold text-neutral-900">{t('checkout.title')}</Text>

      <View className={`mt-4 gap-4 ${getCheckoutSectionsLayoutClass(isDesktop)}`}>
        <View className={isDesktop ? 'flex-1 rounded-xl border border-neutral-200 p-4' : 'rounded-xl border border-neutral-200 p-4'}>
          {isPaymentStep ? (
            <>
              <Text className="text-lg font-semibold text-neutral-900">{t('checkout.paymentMethodsTitle')}</Text>

              {isLoadingPaymentMethods ? <Text className="mt-3 text-sm text-neutral-600">{t('checkout.paymentMethodsLoading')}</Text> : null}
              {paymentMethodsError ? <Text className="mt-3 text-sm text-red-600">{paymentMethodsError}</Text> : null}
              {!isLoadingPaymentMethods && !paymentMethodsError && paymentMethods.length === 0 ? (
                <Text className="mt-3 text-sm text-neutral-600">{t('checkout.paymentMethodsEmpty')}</Text>
              ) : null}

              <View className="mt-3 gap-2">
                {paymentMethods.map((method) => {
                  const isSelected = selectedPaymentMethodId === method.id;
                  return (
                    <Pressable
                      key={method.id}
                      onPress={() => setSelectedPaymentMethodId(method.id)}
                      className={`rounded-lg border px-3 py-3 ${isSelected ? 'border-primary-600 bg-primary-50' : 'border-neutral-300'}`}
                      accessibilityRole="button"
                      accessibilityLabel={t('checkout.paymentMethodOptionA11yLabel', { method: method.name })}
                    >
                      <Text className={`text-sm font-medium ${isSelected ? 'text-primary-700' : 'text-neutral-900'}`}>{method.name}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </>
          ) : (
            <>
              <Text className="text-lg font-semibold text-neutral-900">{t('checkout.customerInfoTitle')}</Text>

              <TextInput autoComplete="given-name" value={customer.firstname} onChangeText={(v) => setCustomer((p) => ({ ...p, firstname: v }))} placeholder={t('checkout.firstnameLabel')} className="mt-3 rounded-lg border border-neutral-300 px-3 py-2" />
              <TextInput autoComplete="family-name" value={customer.lastname} onChangeText={(v) => setCustomer((p) => ({ ...p, lastname: v }))} placeholder={t('checkout.lastnameLabel')} className="mt-2 rounded-lg border border-neutral-300 px-3 py-2" />
              <TextInput autoComplete="email" value={customer.email} onChangeText={(v) => setCustomer((p) => ({ ...p, email: v }))} placeholder={t('checkout.emailLabel')} keyboardType="email-address" className="mt-2 rounded-lg border border-neutral-300 px-3 py-2" />
              <TextInput autoComplete="tel" value={customer.phone} onChangeText={(v) => setCustomer((p) => ({ ...p, phone: v }))} placeholder={t('checkout.phoneLabel')} keyboardType="phone-pad" className="mt-2 rounded-lg border border-neutral-300 px-3 py-2" />
              <TextInput autoComplete="street-address" value={customer.address_street} onChangeText={(v) => setCustomer((p) => ({ ...p, address_street: v }))} placeholder={t('checkout.addressStreetLabel')} className="mt-2 rounded-lg border border-neutral-300 px-3 py-2" />
              <TextInput autoComplete="postal-code" value={customer.address_zip} onChangeText={(v) => setCustomer((p) => ({ ...p, address_zip: v }))} placeholder={t('checkout.addressZipLabel')} className="mt-2 rounded-lg border border-neutral-300 px-3 py-2" />
              <TextInput autoComplete="postal-address-locality" value={customer.address_city} onChangeText={(v) => setCustomer((p) => ({ ...p, address_city: v }))} placeholder={t('checkout.addressCityLabel')} className="mt-2 rounded-lg border border-neutral-300 px-3 py-2" />

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
                        onPress={() => selectDeliveryPoint(point.id)}
                        disabled={isSavingDeliveryMethod}
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
                {isSavingDeliveryMethod ? <Text className="mt-2 text-sm text-neutral-600">{t('checkout.deliveryMethodSaving')}</Text> : null}
                {deliveryMethodError ? <Text className="mt-2 text-sm text-red-600">{deliveryMethodError}</Text> : null}
              </View>
            </>
          )}
        </View>

        <View className={isDesktop ? 'w-96 rounded-xl bg-neutral-50 p-4' : 'rounded-xl bg-neutral-50 p-4'}>
          <Text className="text-lg font-semibold text-neutral-900">{t('cart.orderSummaryTitle')}</Text>

          <View className="mt-3 gap-2">
            {items.map((item, index) => {
              const linePricing = getDiscountLinePricing(item, discountPercentagesByProduct);
              return (
                <View key={`${item.product.id ?? item.product.ean}-${index}`} className="flex-row items-center justify-between">
                  <Text className="text-sm text-neutral-800">{item.product.name} x {item.quantity}</Text>
                  <View className="items-end">
                    <Text className={`text-sm ${hasActiveDiscount ? 'text-red-600' : 'text-neutral-700'}`}>
                      {linePricing.lineDiscounted !== null ? formatPriceWithCurrency(linePricing.lineDiscounted, i18n.language) : t('category.priceUnavailable')}
                    </Text>
                    {hasActiveDiscount ? (
                      <Text className="text-xs text-neutral-500 line-through">
                        {linePricing.lineOriginal !== null ? formatPriceWithCurrency(linePricing.lineOriginal, i18n.language) : t('category.priceUnavailable')}
                      </Text>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>

          <View className="my-4 h-px bg-neutral-200" />

          <View className="gap-2">
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
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-neutral-700">{t('cart.totalWithoutVatLabel')}</Text>
              <Text className="text-sm text-neutral-900">{formatPriceWithCurrency(summaryWithoutVat, i18n.language)}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-neutral-900">{t('cart.totalLabelText')}</Text>
              <View className="items-end">
                <Text className="text-sm font-semibold text-neutral-900">{formatPriceWithCurrency(summaryTotalWithDelivery, i18n.language)}</Text>
                {hasActiveDiscount ? <Text className="text-xs text-neutral-500 line-through">{formatPriceWithCurrency(discountTotals.subtotalOriginal, i18n.language)}</Text> : null}
              </View>
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
                  onPress={applyDiscountAndSyncOrder}
                  disabled={isApplyingDiscount}
                  className={`rounded-lg px-3 py-2 ${isApplyingDiscount ? 'bg-neutral-300' : 'bg-primary-600'}`}
                  accessibilityRole="button"
                  accessibilityLabel={t('discount.applyButton')}
                >
                  <Text className="text-sm font-medium text-white">{t('discount.applyButton')}</Text>
                </Pressable>
                {activeDiscountCode ? (
                  <Pressable
                    onPress={clearDiscountAndSyncOrder}
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
            onPress={goToPaymentStep}
            disabled={!canProceedToPayment || isLoadingPaymentMethods}
            className={`mt-4 items-center rounded-lg px-3 py-3 ${!canProceedToPayment || isLoadingPaymentMethods ? 'bg-neutral-300' : 'bg-primary-600'}`}
            accessibilityRole="button"
            accessibilityLabel={t('checkout.nextToPaymentButton')}
          >
            <Text className="text-sm font-medium text-white">{t('checkout.nextToPaymentButton')}</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView >
  );
}

export { getCheckoutSectionsLayoutClass, isDesktopWidth };
