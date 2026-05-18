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

    const viewNodes = tree!.root.findAllByType('View');
    const contentContainer = viewNodes.find((node) => node.props.className === 'flex-1');
    expect(contentContainer).toBeDefined();

    const rootView = viewNodes.find((node) => node.props.className === 'flex-1 bg-white');
    expect(rootView).toBeDefined();

    const rootChildren = rootView!.props.children;
    expect(Array.isArray(rootChildren)).toBe(true);
    expect(typeof rootChildren[0].type).toBe('function');
    expect(rootChildren[1].type.name).toBe('GlobalBottomInfoLink');
  });
});
