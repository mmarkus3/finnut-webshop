import { HomeCategoryLinksRow, getCategoryTranslationKey } from '@/components/home/HomeCategoryLinksRow';
import { Category } from '@/types/category';
import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';

jest.mock('expo-router', () => {
  const ReactLocal = require('react');

  return {
    Link: ({ children, ...props }: { children: React.ReactNode }) =>
      ReactLocal.createElement('MockLink', props, children),
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, string>) => {
      if (key === 'home.categoriesLabel') {
        return 'Browse categories';
      }

      if (key === 'home.categoryLinkA11yLabel') {
        return `Open category ${options?.category ?? ''}`;
      }

      if (key.startsWith('categories.')) {
        return options?.defaultValue ?? key;
      }

      return key;
    },
  }),
}));

const mockI18n = { language: 'en' };

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, string | number>) => {
      if (key === 'home.categoryLinkA11yLabel') return `Open category ${options?.category}`;
      return key;
    },
    i18n: mockI18n,
  }),
}));

describe('HomeCategoryLinksRow', () => {
  const categories: Category[] = [
    { id: 'fruits', name_en: 'Fruits', name_fi: 'Hedelmät', name_sv: 'Fruits', description: 'Fresh fruits' },
    { id: 'dairy', name_en: 'Dairy', name_fi: 'Maitotuotteet', name_sv: 'Dairy', description: 'Milk products' },
  ];

  it('maps category to translation key', () => {
    expect(getCategoryTranslationKey(categories[0])).toBe('categories.fruits.name');
  });

  it('renders no content when categories are empty', () => {
    let tree: ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<HomeCategoryLinksRow categories={[]} />);
    });

    expect(tree?.toJSON()).toBeNull();
  });

  it('renders one accessible link per category with navigation target', () => {
    let tree: ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<HomeCategoryLinksRow categories={categories} />);
    });

    const links = tree!.root.findAllByType('MockLink');
    expect(links).toHaveLength(2);

    expect(links[0].props.href).toEqual({
      pathname: '/category/[categoryId]',
      params: { categoryId: 'fruits' },
    });
    expect(links[0].props.accessibilityRole).toBe('link');
    expect(links[0].props.accessibilityLabel).toBe('Open category categories.fruits.name');

    expect(links[1].props.href).toEqual({
      pathname: '/category/[categoryId]',
      params: { categoryId: 'dairy' },
    });
  });
});
