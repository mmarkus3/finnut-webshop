import { GlobalBottomInfoLink } from '@/components/layout/GlobalBottomInfoLink';
import React from 'react';
import renderer from 'react-test-renderer';
import { Linking } from 'react-native';

const mockPush = jest.fn();

jest.mock('@expo/vector-icons/FontAwesome', () => 'FontAwesome');

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
      if (key === 'information.instagramLabel') return 'Instagram';
      if (key === 'information.instagramA11yLabel') return 'Open Instagram page';
      if (key === 'information.facebookLabel') return 'Facebook';
      if (key === 'information.facebookA11yLabel') return 'Open Facebook page';
      return key;
    },
  }),
}));

describe('GlobalBottomInfoLink', () => {
  let openUrlSpy: jest.SpyInstance;

  beforeAll(() => {
    openUrlSpy = jest.spyOn(Linking, 'openURL').mockResolvedValue();
  });

  afterAll(() => {
    openUrlSpy.mockRestore();
  });

  beforeEach(() => {
    mockPush.mockReset();
    openUrlSpy.mockClear();
  });

  it('renders information and social links with centered social row', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<GlobalBottomInfoLink />);
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Information')).toBe(true);
    const instagramButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Open Instagram page'
    );
    const facebookButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Open Facebook page'
    );
    expect(instagramButton).toBeDefined();
    expect(facebookButton).toBeDefined();
    const rootContainer = tree!.root.find(
      (node) => node.type === 'View' && typeof node.props.className === 'string' && node.props.className.includes('bg-primary-500')
    );
    expect(rootContainer).toBeDefined();
    const centeredRows = tree!.root.findAll(
      (node) =>
        node.type === 'View' &&
        typeof node.props.className === 'string' &&
        node.props.className.includes('flex-row') &&
        node.props.className.includes('justify-center')
    );
    expect(centeredRows.length).toBeGreaterThan(0);
  });

  it('navigates to information page', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<GlobalBottomInfoLink />);
    });

    const linkButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Open information page'
    );

    renderer.act(() => {
      linkButton.props.onPress();
    });

    expect(mockPush).toHaveBeenCalledWith('/information');
  });

  it('opens social links with correct URLs', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<GlobalBottomInfoLink />);
    });

    const instagramButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Open Instagram page'
    );
    const facebookButton = tree!.root.find(
      (node) => typeof node.props.onPress === 'function' && node.props.accessibilityLabel === 'Open Facebook page'
    );

    renderer.act(() => {
      instagramButton.props.onPress();
    });
    renderer.act(() => {
      facebookButton.props.onPress();
    });

    expect(openUrlSpy).toHaveBeenCalledWith('https://www.instagram.com/goodhabitsnacks/');
    expect(openUrlSpy).toHaveBeenCalledWith('https://www.facebook.com/goodhabitsnacks');
    expect(Linking.openURL).toBeDefined();
  });
});
