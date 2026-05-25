import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { showPreferences } from 'vanilla-cookieconsent';

interface TermsSection {
  heading?: string;
  paragraphs: string[];
}

export function InformationPage() {
  const { t } = useTranslation();
  const rawTermsSections = t('information.termsSections', { returnObjects: true });
  const termsSections = Array.isArray(rawTermsSections) ? (rawTermsSections as TermsSection[]) : [];

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <View className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
        <Text className="text-2xl font-semibold text-neutral-900">{t('information.title')}</Text>
        <Text className="mt-3 text-xl font-semibold text-neutral-900">{t('information.termsTitle')}</Text>
        <View className="mt-3 gap-4">
          {termsSections.map((section, sectionIndex) => (
            <View key={`terms-section-${sectionIndex}`} className="gap-2">
              {section.heading ? <Text className="text-base font-semibold text-neutral-900">{section.heading}</Text> : null}
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <Text key={`terms-section-${sectionIndex}-paragraph-${paragraphIndex}`} className="text-sm leading-6 text-neutral-700">
                  {paragraph}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </View>
      <View className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 mt-2">
        <Text className="mt-3 text-xl font-semibold text-neutral-900 mb-2">{t('information.cookiesTitle')}</Text>
        <Pressable onPress={() => {
          showPreferences();
        }} accessibilityRole="button" accessibilityLabel={t('information.openCookiePreference')}>
          <Text className="text-sm font-mediu">{t('information.openCookiePreference')}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
