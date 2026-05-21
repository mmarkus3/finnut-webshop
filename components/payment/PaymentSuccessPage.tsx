import { useCart } from '@/hooks/cart';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

type PaymentReturnStatus = 'success' | 'failed' | 'unresolved' | 'maintenance' | 'unknown';

const normalizeReturnCode = (value: unknown): string | null => {
  if (Array.isArray(value)) {
    return typeof value[0] === 'string' ? value[0] : null;
  }

  return typeof value === 'string' ? value : null;
};

const getPaymentReturnStatus = (returnCode: string | null): PaymentReturnStatus => {
  if (returnCode === '0') {
    return 'success';
  }
  if (returnCode === '1') {
    return 'failed';
  }
  if (returnCode === '4') {
    return 'unresolved';
  }
  if (returnCode === '10') {
    return 'maintenance';
  }

  return 'unknown';
};

export function PaymentSuccessPage() {
  const { clearCart } = useCart();
  const router = useRouter();
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const returnCode = normalizeReturnCode(params.RETURN_CODE);
  const status = getPaymentReturnStatus(returnCode);

  const titleKey = `paymentSuccess.${status}.title`;
  const bodyKey = `paymentSuccess.${status}.body`;

  useEffect(() => {
    if (returnCode === '0') {
      clearCart();
    }
  }, [clearCart, returnCode]);

  return (
    <View className="flex-1 items-center justify-center bg-white px-4 py-12">
      <View className="w-full max-w-xl items-center">
        <Text className="text-center text-2xl font-semibold text-neutral-900">{t(titleKey)}</Text>
        <Text className="mt-3 text-center text-base text-neutral-700">{t(bodyKey)}</Text>
        <Pressable
          onPress={() => router.push('/')}
          className="mt-6 rounded-lg bg-primary-600 px-5 py-3"
          accessibilityRole="button"
          accessibilityLabel={t('paymentSuccess.homeButton')}
        >
          <Text className="text-sm font-medium text-white">{t('paymentSuccess.homeButton')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export { getPaymentReturnStatus, normalizeReturnCode };
