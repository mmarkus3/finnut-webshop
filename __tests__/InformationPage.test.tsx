import { InformationPage } from '@/components/information/InformationPage';
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === 'information.title') return 'Information';
      if (key === 'information.termsTitle') return 'Villkor';
      if (key === 'information.termsSections') {
        return [
          {
            heading: 'Kontakta oss',
            paragraphs: ['E-post: eetu@finnut.fi', 'Telefon: +358 40 727 2051'],
          },
        ];
      }
      return key;
    },
  }),
}));

describe('InformationPage', () => {
  it('renders swedish terms title and representative terms content', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<InformationPage />);
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Information')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Villkor')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Kontakta oss')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'E-post: eetu@finnut.fi')).toBe(true);
  });
});
