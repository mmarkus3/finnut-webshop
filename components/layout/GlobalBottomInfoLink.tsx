import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

export function GlobalBottomInfoLink() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="bg-primary-500 px-4 py-3">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('information.linkA11yLabel')}
        onPress={() => router.push('/information')}
      >
        <Text className="text-sm font-semibold text-white">
          {t('information.linkLabel')}
        </Text>
      </Pressable>
    </View>
  );
}
