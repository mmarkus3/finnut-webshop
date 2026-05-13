import { Asset } from "expo-asset";
import { Image } from 'expo-image';
import { Stack } from "expo-router";
import Head from 'expo-router/head';
import { cssInterop } from "nativewind";
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import '../i18n/config';
import './global.css';

function LogoTitle() {
  return (
    <Image
      allowDownscaling={false}
      contentFit="cover"
      style={{ width: 110, height: 50, margin: 16 }}
      source={Asset.fromModule(require('../assets/images/Finnut-Logo-white.webp'))} />
  );
}

const StyledView = cssInterop(View, {
  className: 'style',
});

function RootStack() {
  const { t } = useTranslation();

  return (
    <Stack screenOptions={{
      headerShown: true,
      headerBackground: () => <StyledView className="h-20 bg-primary-500 p-4" />,
      headerTintColor: '#fff',
      headerTransparent: true,
      headerLeft: () => <LogoTitle />,
      contentStyle: { paddingTop: 80 },
    }}>
      <Stack.Screen
        name="index"
        options={{
          title: t('common.title'),
        }}
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
