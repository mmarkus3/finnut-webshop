import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Linking, Pressable, Text, View } from 'react-native';

const INSTAGRAM_URL = 'https://www.instagram.com/goodhabitsnacks/';
const FACEBOOK_URL = 'https://www.facebook.com/goodhabitsnacks';

export function GlobalBottomInfoLink() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="bg-primary-500 px-4 py-4">
      <View className="my-4 flex-row items-center justify-center gap-4 pb-6 border-b border-white">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('information.linkA11yLabel')}
          onPress={() => router.push('/information')}
        >
          <Text className="text-white underline">
            {t('information.linkLabel')}
          </Text>
        </Pressable>
      </View>
      <View className="my-4 flex-row items-center justify-center gap-4">
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={t('information.instagramA11yLabel')}
          onPress={() => Linking.openURL(INSTAGRAM_URL)}
        >
          <FontAwesome className="text-white" name="instagram" size={20} />
        </Pressable>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={t('information.facebookA11yLabel')}
          onPress={() => Linking.openURL(FACEBOOK_URL)}
        >
          <FontAwesome className="text-white" name="facebook" size={20} />
        </Pressable>
      </View>
      <View className="flex-row justify-center">
        <Text className="text-xs text-white">Copyright © 2026 Finnut Oy</Text>
      </View>
    </View>
  );
}
