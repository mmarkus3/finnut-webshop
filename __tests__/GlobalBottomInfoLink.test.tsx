import { GlobalBottomInfoLink } from '@/components/layout/GlobalBottomInfoLink';
import React from 'react';
import renderer from 'react-test-renderer';

const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === 'information.linkLabel') return 'Information';
      if (key === 'information.linkA11yLabel') return 'Open information page';
      return key;
    },
  }),
}));

describe('GlobalBottomInfoLink', () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it('renders information link and navigates to information page', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<GlobalBottomInfoLink />);
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Information')).toBe(true);
    const rootContainer = tree!.root.find(
      (node) => node.type === 'View' && typeof node.props.className === 'string' && node.props.className.includes('bg-primary-500')
    );
    expect(rootContainer).toBeDefined();

    const linkButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Open information page'
    );

    renderer.act(() => {
      linkButton.props.onPress();
    });

    expect(mockPush).toHaveBeenCalledWith('/information');
  });
});
