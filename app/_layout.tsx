import { CookieConsentInitializer } from '@/components/consent/CookieConsentInitializer';
import { formatPriceWithCurrency } from '@/components/product/priceFormatting';
import { SearchModal } from '@/components/search/SearchModal';
import { CartProvider, useCart } from '@/hooks/cart';
import { DeliveryPricingProvider, useDeliveryPricing } from '@/hooks/deliveryPricing';
import { useProducts } from '@/hooks/products';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Asset } from 'expo-asset';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { cssInterop } from 'nativewind';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import '../i18n/config';
import './global.css';

const logoImageSource = { uri: Asset.fromModule(require('../assets/images/Finnut-Logo-white.webp')).uri };

function LogoTitle() {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.navigate('/')} className="pt-10">
      <Image
        allowDownscaling={false}
        contentFit="cover"
        style={{ width: 110, height: 50, margin: 24 }}
        source={logoImageSource}
      />
    </TouchableOpacity>
  );
}

interface HeaderActionsProps {
  onSearchPress: () => void;
}

function HeaderActions({ onSearchPress }: HeaderActionsProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { itemCount, badgeCountLabel } = useCart();

  return (
    <View className="flex-row gap-4 pr-4 pt-10">
      <TouchableOpacity
        onPress={onSearchPress}
        accessibilityRole="button"
        accessibilityLabel={t('search.openModalA11yLabel')}
      >
        <FontAwesome name="search" size={22} color="#ffffff" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/cart')}
        accessibilityRole="button"
        accessibilityLabel={t('search.cartA11yLabel')}
      >
        <FontAwesome name="shopping-cart" size={22} color="#ffffff" />
        {itemCount > 0 ? (
          <View className="absolute -right-2 -top-2 min-w-5 items-center rounded-full bg-red-600 px-1">
            <Text className="text-xs font-semibold text-white">{badgeCountLabel}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const StyledView = cssInterop(View, {
  className: 'style',
});

function RootStack() {
  const { products, isLoading } = useProducts();
  const { pricing } = useDeliveryPricing();
  const { i18n, t } = useTranslation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {pricing ? (
        <View className="px-4 py-2 bg-emerald-50 border-b border-emerald-200">
          <Text className="text-xs text-emerald-800">
            {t('delivery.bannerFreeOver', { over: formatPriceWithCurrency(pricing.over, i18n.language, 0) })}
          </Text>
        </View>
      ) : null}
      <Stack
        screenOptions={{
          headerShown: true,
          headerBackground: () => <StyledView className="h-28 bg-primary-500 p-4" />,
          headerTintColor: '#fff',
          headerTransparent: true,
          headerLeft: () => <LogoTitle />,
          headerRight: () => <HeaderActions onSearchPress={() => setIsSearchOpen(true)} />,
          headerTitle: '',
          contentStyle: { paddingTop: pricing ? 116 : 80 },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="search/index" />
        <Stack.Screen name="cart/index" />
        <Stack.Screen name="checkout/index" />
        <Stack.Screen name="payment/success/index" />
        <Stack.Screen name="order/index" />
        <Stack.Screen name="information/index" />
      </Stack>
      <SearchModal
        isVisible={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        isLoadingProducts={isLoading}
      />
    </>
  );
}

export default function RootLayout() {
  const { t } = useTranslation();

  return (
    <DeliveryPricingProvider>
      <CartProvider>
        <CookieConsentInitializer />
        <Head>
          <title>{t('common.title')}</title>
          <meta name="description" content={t('common.description')} />
        </Head>
        <RootStack />
      </CartProvider>
    </DeliveryPricingProvider>
  );
}
