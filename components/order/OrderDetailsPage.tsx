import { formatPriceWithCurrency } from '@/components/product/priceFormatting';
import { fetchOrderDetails } from '@/hooks/orderDetails';
import { Order, OrderProduct } from '@/types/order';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

type TimelineStatus = Order['status'];
type TimelineStepState = 'complete' | 'current' | 'future' | 'unknown';
type LoadingState = 'missing' | 'loading' | 'loaded' | 'error';

const TIMELINE_STATUSES: TimelineStatus[] = ['pending', 'placed', 'sent'];

const getOrderStatusStepState = (currentStatus: string, step: TimelineStatus): TimelineStepState => {
  const currentIndex = TIMELINE_STATUSES.indexOf(currentStatus as TimelineStatus);
  if (currentIndex === -1) return 'unknown';

  const stepIndex = TIMELINE_STATUSES.indexOf(step);
  if (stepIndex < currentIndex) return 'complete';
  if (stepIndex === currentIndex) return 'current';
  return 'future';
};

const getTimelineStepClassName = (state: TimelineStepState): string => {
  if (state === 'complete') return 'border-emerald-200 bg-emerald-50 text-emerald-800';
  if (state === 'current') return 'border-emerald-600 bg-emerald-600 text-white';
  return 'border-neutral-200 bg-neutral-100 text-neutral-600';
};

const getOrderTotal = (products: OrderProduct[]): number | null => {
  if (products.some((product) => !Number.isFinite(product.finalPrice))) return null;

  return products.reduce((total, product) => total + product.amount * product.finalPrice!, 0);
};

interface OrderDetailsPageProps {
  orderId: string | null;
}

export function OrderDetailsPage({ orderId }: OrderDetailsPageProps) {
  const { t, i18n } = useTranslation();
  const normalizedOrderId = orderId?.trim() ?? '';
  const [state, setState] = useState<LoadingState>(normalizedOrderId ? 'loading' : 'missing');
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    let active = true;

    if (!normalizedOrderId) {
      setState('missing');
      setOrder(null);
      return () => {
        active = false;
      };
    }

    setState('loading');
    setOrder(null);
    fetchOrderDetails(normalizedOrderId)
      .then((result) => {
        if (!active) return;
        setOrder(result);
        setState('loaded');
      })
      .catch(() => {
        if (!active) return;
        setState('error');
      });

    return () => {
      active = false;
    };
  }, [normalizedOrderId]);

  if (state === 'missing') {
    return (
      <View className="flex-1 items-center justify-center px-4 py-12">
        <Text className="text-xl font-semibold text-neutral-900">{t('orderDetails.missingTitle')}</Text>
        <Text className="mt-2 text-center text-sm text-neutral-600">{t('orderDetails.missingBody')}</Text>
      </View>
    );
  }

  if (state === 'loading') {
    return (
      <View className="flex-1 items-center justify-center px-4 py-12">
        <Text className="text-sm text-neutral-600">{t('orderDetails.loading')}</Text>
      </View>
    );
  }

  if (state === 'error' || !order) {
    return (
      <View className="flex-1 items-center justify-center px-4 py-12">
        <Text className="text-xl font-semibold text-neutral-900">{t('orderDetails.errorTitle')}</Text>
        <Text className="mt-2 text-center text-sm text-neutral-600">{t('orderDetails.errorBody')}</Text>
      </View>
    );
  }

  const total = order.amount ?? getOrderTotal(order.products);
  const hasKnownStatus = TIMELINE_STATUSES.includes(order.status);

  return (
    <View className="w-full max-w-5xl self-center px-4 py-8">
      <Text className="text-2xl font-semibold text-neutral-900">{t('orderDetails.title')}</Text>
      <Text className="mt-2 text-sm text-neutral-600">
        {t('orderDetails.orderIdLabel', { orderId: order.id ?? normalizedOrderId })}
      </Text>

      <View className="mt-8">
        <Text className="text-lg font-semibold text-neutral-900">{t('orderDetails.statusTitle')}</Text>
        {!hasKnownStatus ? <Text className="mt-2 text-sm text-neutral-600">{t('orderDetails.unknownStatus')}</Text> : null}
        <View className="mt-4 flex-row flex-wrap gap-2">
          {TIMELINE_STATUSES.map((status) => {
            const stepState = getOrderStatusStepState(order.status, status);
            return (
              <View
                key={status}
                className={`min-w-[132px] flex-1 rounded-md border-l-4 px-3 py-3 ${getTimelineStepClassName(stepState)}`}
                accessibilityLabel={t('orderDetails.statusStepA11yLabel', {
                  status: t(`orderDetails.status.${status}`),
                  state: t(`orderDetails.statusState.${stepState}`),
                })}
              >
                <Text className={`text-sm font-medium ${stepState === 'current' ? 'text-white' : stepState === 'complete' ? 'text-emerald-800' : 'text-neutral-700'}`}>
                  {t(`orderDetails.status.${status}`)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <View className="mt-8 border-t border-neutral-200 pt-6">
        <Text className="text-lg font-semibold text-neutral-900">{t('orderDetails.productsTitle')}</Text>
        <View className="mt-3 gap-3">
          {order.products.map((product, index) => (
            <View key={`${product.id}-${index}`} className="flex-row items-start justify-between gap-4">
              <View className="flex-1">
                <Text className="text-sm font-medium text-neutral-900">{product.name}</Text>
                <Text className="mt-1 text-xs text-neutral-600">
                  {t('orderDetails.amountLabel', { amount: product.amount })}
                </Text>
              </View>
              <Text className="text-sm text-neutral-900">
                {Number.isFinite(product.finalPrice)
                  ? formatPriceWithCurrency(product.finalPrice! / 100, i18n.language)
                  : t('orderDetails.priceUnavailable')}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="mt-8 border-t border-neutral-200 pt-6">
        <Text className="text-lg font-semibold text-neutral-900">{t('orderDetails.summaryTitle')}</Text>
        <View className="mt-3 flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-neutral-900">{t('orderDetails.totalLabel')}</Text>
          <Text className="text-sm font-semibold text-neutral-900">
            {total === null ? t('orderDetails.totalUnavailable') : formatPriceWithCurrency(total / 100, i18n.language)}
          </Text>
        </View>
      </View>

      <View className="mt-8 border-t border-neutral-200 pt-6">
        <Text className="text-lg font-semibold text-neutral-900">{t('orderDetails.customerTitle')}</Text>
        {order.customer ? (
          <View className="mt-3 gap-2">
            <View>
              <Text className="text-xs text-neutral-500">{t('orderDetails.customerNameLabel')}</Text>
              <Text className="text-sm text-neutral-900">{`${order.customer.firstname} ${order.customer.lastname}`}</Text>
            </View>
            <View>
              <Text className="text-xs text-neutral-500">{t('orderDetails.customerEmailLabel')}</Text>
              <Text className="text-sm text-neutral-700">{order.customer.email}</Text>
            </View>
            <View>
              <Text className="text-xs text-neutral-500">{t('orderDetails.customerPhoneLabel')}</Text>
              <Text className="text-sm text-neutral-700">{order.customer.phone}</Text>
            </View>
            <View>
              <Text className="text-xs text-neutral-500">{t('orderDetails.customerAddressLabel')}</Text>
              <Text className="text-sm text-neutral-700">{order.customer.address_street}</Text>
              <Text className="text-sm text-neutral-700">{`${order.customer.address_zip} ${order.customer.address_city}`}</Text>
            </View>
          </View>
        ) : (
          <Text className="mt-3 text-sm text-neutral-600">{t('orderDetails.customerUnavailable')}</Text>
        )}
      </View>
    </View>
  );
}

export { getOrderStatusStepState, getOrderTotal, getTimelineStepClassName, TIMELINE_STATUSES };

