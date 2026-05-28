import {
  getItemName,
  getProductIdentifier,
  getProductPrice,
} from '@/components/product/cardUtils';
import { formatPriceWithCurrency } from '@/components/product/priceFormatting';
import { filterProductsByQuery, normalizeSearchQuery } from '@/hooks/productSearch';
import { Product } from '@/types/product';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

const SEARCH_PREVIEW_LIMIT = 6;
const SEARCH_DEBOUNCE_MS = 250;

interface SearchModalProps {
  isVisible: boolean;
  onClose: () => void;
  products: Product[];
  isLoadingProducts: boolean;
}

const getModalPreviewProducts = (products: Product[], query: string): Product[] => {
  const normalizedQuery = normalizeSearchQuery(query);
  return filterProductsByQuery(products, normalizedQuery).slice(0, SEARCH_PREVIEW_LIMIT);
};

const canSubmitSearchQuery = (query: string): boolean => Boolean(normalizeSearchQuery(query));

export function SearchModal({ isVisible, onClose, products, isLoadingProducts }: SearchModalProps) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!isVisible) {
      setQuery('');
      setDebouncedQuery('');
      return;
    }

    const timeout = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(timeout);
  }, [isVisible]);

  const normalizedQuery = normalizeSearchQuery(debouncedQuery);

  const filteredProducts = useMemo(() => getModalPreviewProducts(products, normalizedQuery), [products, normalizedQuery]);

  const closeAndNavigateToSearch = (nextQuery: string) => {
    const normalized = normalizeSearchQuery(nextQuery);
    if (!canSubmitSearchQuery(nextQuery)) {
      return;
    }

    onClose();
    router.push({ pathname: '/search', params: { q: normalized } });
  };

  const openProduct = (product: Product) => {
    onClose();
    router.push({
      pathname: '/product/[productId]',
      params: { productId: getProductIdentifier(product) },
    });
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent onRequestClose={onClose}>
      <View className="flex-1 items-center justify-start bg-black/40 px-4 pt-28">
        <View className="w-full max-w-2xl rounded-2xl bg-white p-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-neutral-900">{t('search.modalTitle')}</Text>
            <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel={t('search.closeA11yLabel')}>
              <Text className="text-sm font-medium text-primary-700">{t('search.closeButton')}</Text>
            </Pressable>
          </View>

          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => closeAndNavigateToSearch(query)}
            placeholder={t('search.placeholder')}
            accessibilityLabel={t('search.inputA11yLabel')}
            returnKeyType="search"
            className="mt-3 rounded-xl border border-neutral-300 px-3 py-2 text-base text-neutral-900"
          />

          {normalizedQuery ? (
            <View className="mt-3 max-h-96">
              {isLoadingProducts ? <Text className="text-sm text-neutral-500">{t('search.loading')}</Text> : null}
              {!isLoadingProducts && filteredProducts.length === 0 ? (
                <Text className="text-sm text-neutral-500">{t('search.noResults')}</Text>
              ) : null}

              <FlatList
                data={filteredProducts}
                keyExtractor={(item, index) => item.id ?? `${item.ean}-${index}`}
                renderItem={({ item }) => {
                  const price = getProductPrice(item);
                  return (
                    <Pressable
                      onPress={() => openProduct(item)}
                      className="mt-2 rounded-lg border border-neutral-200 p-3"
                      accessibilityRole="button"
                      accessibilityLabel={t('search.productResultA11yLabel', { product: getItemName(item, i18n.language) })}
                    >
                      <Text className="text-sm font-semibold text-neutral-900">{getItemName(item, i18n.language)}</Text>
                      <Text className="text-xs text-neutral-600">
                        {t('search.priceLabel', {
                          price: price !== null ? formatPriceWithCurrency(price, i18n.language) : t('category.priceUnavailable'),
                        })}
                      </Text>
                    </Pressable>
                  );
                }}
              />

              <Pressable
                onPress={() => closeAndNavigateToSearch(query)}
                className="mt-3 items-center rounded-lg bg-primary-600 px-3 py-2"
                accessibilityRole="button"
                accessibilityLabel={t('search.viewAllA11yLabel')}
              >
                <Text className="text-sm font-medium text-white">{t('search.viewAllButton')}</Text>
              </Pressable>
            </View>
          ) : (
            <Text className="mt-3 text-sm text-neutral-500">{t('search.startTyping')}</Text>
          )}
        </View>
      </View>
    </Modal>
  );
}

export { canSubmitSearchQuery, getModalPreviewProducts, SEARCH_PREVIEW_LIMIT };

