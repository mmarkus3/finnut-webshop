import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Asset } from "expo-asset";
import { Image } from 'expo-image';
import { Stack, useRouter } from "expo-router";
import Head from 'expo-router/head';
import { cssInterop } from "nativewind";
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import '../i18n/config';
import './global.css';

const logoImageSource = { uri: Asset.fromModule(require('../assets/images/Finnut-Logo-white.webp')).uri };

function LogoTitle({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        allowDownscaling={false}
        contentFit="cover"
        style={{ width: 110, height: 50, margin: 16 }}
        source={logoImageSource} />
    </TouchableOpacity>
  );
}

function HeaderActions() {
  return (
    <View className="flex-row gap-1">
      <TouchableOpacity>
        <FontAwesome.Button name="search" backgroundColor="bg-primary-500"></FontAwesome.Button>
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome.Button name="shopping-cart" backgroundColor="bg-primary-500"></FontAwesome.Button>
      </TouchableOpacity>
    </View>
  );
}

const StyledView = cssInterop(View, {
  className: 'style',
});

function RootStack() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogoPress = () => {
    router.navigate('/');
  }

  return (
    <Stack screenOptions={{
      headerShown: true,
      headerBackground: () => <StyledView className="h-20 bg-primary-500 p-4" />,
      headerTintColor: '#fff',
      headerTransparent: true,
      headerLeft: () => <LogoTitle onPress={handleLogoPress} />,
      headerRight: () => <HeaderActions />,
      headerTitle: '',
      contentStyle: { paddingTop: 80 },
    }}>
      <Stack.Screen
        name="index"
      />
    </Stack>
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
