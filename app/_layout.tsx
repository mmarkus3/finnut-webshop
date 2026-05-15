import { SearchModal } from '@/components/search/SearchModal';
import { useProducts } from '@/hooks/products';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Asset } from 'expo-asset';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { cssInterop } from 'nativewind';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import '../i18n/config';
import './global.css';

const logoImageSource = { uri: Asset.fromModule(require('../assets/images/Finnut-Logo-white.webp')).uri };

function LogoTitle() {
  const router = useRouter();

  const handleLogoPress = () => {
    router.navigate('/');
  };

  return (
    <TouchableOpacity onPress={handleLogoPress}>
      <Image
        allowDownscaling={false}
        contentFit="cover"
        style={{ width: 110, height: 50, margin: 16 }}
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

  return (
    <View className="flex-row gap-4 pr-2">
      <TouchableOpacity
        onPress={onSearchPress}
        accessibilityRole="button"
        accessibilityLabel={t('search.openModalA11yLabel')}
      >
        <FontAwesome name="search" size={22} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel={t('search.cartA11yLabel')}>
        <FontAwesome name="shopping-cart" size={22} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}

const StyledView = cssInterop(View, {
  className: 'style',
});

function RootStack() {
  const { products, isLoading } = useProducts();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          headerBackground: () => <StyledView className="h-20 bg-primary-500 p-4" />,
          headerTintColor: '#fff',
          headerTransparent: true,
          headerLeft: () => <LogoTitle />,
          headerRight: () => <HeaderActions onSearchPress={() => setIsSearchOpen(true)} />,
          headerTitle: '',
          contentStyle: { paddingTop: 80 },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="search/index" />
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
    <>
      <Head>
        <title>{t('common.title')}</title>
        <meta name="description" content={t('common.description')} />
      </Head>
      <RootStack />
    </>
  );
}
