import { Category } from '@/types/category';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

interface HomeCategoryLinksRowProps {
  categories: Category[];
}

const getCategoryTranslationKey = (category: Category) => `categories.${category.id}.name`;

export function HomeCategoryLinksRow({ categories }: HomeCategoryLinksRowProps) {
  const { t } = useTranslation();

  if (categories.length === 0) {
    return null;
  }

  return (
    <View className="w-full gap-2" accessibilityRole="summary">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            href={{
              pathname: '/category/[categoryId]',
              params: { categoryId: category.id },
            }}
            accessibilityRole="link"
            accessibilityLabel={t('home.categoryLinkA11yLabel', {
              category: t(getCategoryTranslationKey(category), { defaultValue: category.name }),
            })}
            className="px-4 py-2"
          >
            <Text className="text-sm font-medium text-primary-600 bg-gray-100 p-6 rounded">
              {t(getCategoryTranslationKey(category), { defaultValue: category.name })}
            </Text>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

export { getCategoryTranslationKey };
