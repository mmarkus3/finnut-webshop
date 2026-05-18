import { AppPageWithInfoLink } from '@/components/layout/AppPageWithInfoLink';
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('@/components/layout/GlobalBottomInfoLink', () => ({
  GlobalBottomInfoLink: () => 'GlobalBottomInfoLink',
}));

describe('AppPageWithInfoLink', () => {
  it('appends information link after page content in normal layout order', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(
        <AppPageWithInfoLink>
          <>Page content</>
        </AppPageWithInfoLink>
      );
    });

    const scrollView = tree!.root.find(
      (node) => typeof node.props.className === 'string' && node.props.className === 'flex-1 bg-white'
    );
    expect(scrollView).toBeDefined();
    expect(scrollView.props.className).toBe('flex-1 bg-white');
    const rootChildren = scrollView.props.children;
    expect(Array.isArray(rootChildren)).toBe(true);
    expect(typeof rootChildren[0].type).toBe('function');
    expect(rootChildren[1].type.name).toBe('GlobalBottomInfoLink');
  });
});
