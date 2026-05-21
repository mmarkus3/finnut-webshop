import { useCart } from '@/hooks/cart';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

export function PaymentSuccessPage() {
  const { clearCart } = useCart();
  const router = useRouter();
  const { t } = useTranslation();

  useLocalSearchParams();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <View className="flex-1 items-center justify-center bg-white px-4 py-12">
      <View className="w-full max-w-xl items-center">
        <Text className="text-center text-2xl font-semibold text-neutral-900">{t('paymentSuccess.title')}</Text>
        <Text className="mt-3 text-center text-base text-neutral-700">{t('paymentSuccess.body')}</Text>
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
