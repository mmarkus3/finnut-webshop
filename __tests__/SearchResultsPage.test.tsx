import { SearchResultsPage, getSearchPseudoCategory, mapProductsToSearchCategory } from '@/components/search/SearchResultsPage';
import { Product } from '@/types/product';
import React from 'react';
import renderer from 'react-test-renderer';

const mockedCategoryProductGrid = jest.fn(() => null);

jest.mock('@/components/category/CategoryProductGrid', () => ({
  CategoryProductGrid: (props: unknown) => {
    mockedCategoryProductGrid(props);
    return null;
  },
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, string | number>) => {
      if (key === 'search.enterQuery') return 'Enter query';
      if (key === 'search.noResults') return 'No products found.';
      if (key === 'search.resultsHeader') return `Results for ${options?.query}`;
      if (key === 'search.resultsTitle') return `Search: ${options?.query}`;
      return key;
    },
  }),
}));

describe('SearchResultsPage', () => {
  const products: Product[] = [
    { id: 'p1', name: 'Apple', amount: 1, ean: '1', images: [], category: 'fruit' },
    { id: 'p2', name: 'Milk', amount: 1, ean: '2', images: [], category: 'dairy' },
  ];

  beforeEach(() => {
    mockedCategoryProductGrid.mockReset();
  });

  it('maps products to pseudo category for shared grid rendering', () => {
    const mapped = mapProductsToSearchCategory(products);
    expect(mapped.every((product) => product.category === '__search_results__')).toBe(true);

    const category = getSearchPseudoCategory('Search: apple');
    expect(category[0].id).toBe('__search_results__');
  });

  it('renders enter-query state for empty query', () => {
    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<SearchResultsPage products={products} query="" isLoading={false} />);
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Enter query')).toBe(true);
    expect(mockedCategoryProductGrid).not.toHaveBeenCalled();
  });

  it('renders grid with matching products for non-empty query', () => {
    renderer.act(() => {
      renderer.create(<SearchResultsPage products={products} query="apple" isLoading={false} />);
    });

    expect(mockedCategoryProductGrid).toHaveBeenCalledTimes(1);
    const props = mockedCategoryProductGrid.mock.calls[0][0] as { products: Product[] };
    expect(props.products).toHaveLength(1);
    expect(props.products[0].name).toBe('Apple');
  });

  it('renders localized empty state when query has no matches', () => {
    let tree: renderer.ReactTestRenderer | null = null;
    renderer.act(() => {
      tree = renderer.create(<SearchResultsPage products={products} query="banana" isLoading={false} />);
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'No products found.')).toBe(true);
  });
});
