import { InformationPage } from '@/components/information/InformationPage';
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === 'information.title') return 'Information';
      if (key === 'information.termsTitle') return 'Terms and conditions';
      if (key === 'information.termsSections') {
        return [
          {
            heading: 'Contact us',
            paragraphs: ['E-mail: eetu@finnut.fi', 'Telephone: +358 40 727 2051'],
          },
        ];
      }
      return key;
    },
  }),
}));

describe('InformationPage', () => {
  it('renders english terms title and representative terms content', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<InformationPage />);
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Information')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Terms and conditions')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Contact us')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'E-mail: eetu@finnut.fi')).toBe(true);
  });
});
