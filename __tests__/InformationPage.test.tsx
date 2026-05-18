import { InformationPage } from '@/components/information/InformationPage';
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === 'information.title') return 'Information';
      if (key === 'information.termsTitle') return 'Toimitusehdot';
      if (key === 'information.termsSections') {
        return [
          {
            heading: 'Verkkokaupan yhteystiedot',
            paragraphs: ['Sähköposti: eetu@finnut.fi', 'Puhelin: +358 40 727 2051'],
          },
        ];
      }
      return key;
    },
  }),
}));

describe('InformationPage', () => {
  it('renders terms title and representative terms content', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<InformationPage />);
    });

    const textNodes = tree!.root.findAllByType('Text');
    expect(textNodes.some((node) => node.props.children === 'Information')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Toimitusehdot')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Verkkokaupan yhteystiedot')).toBe(true);
    expect(textNodes.some((node) => node.props.children === 'Sähköposti: eetu@finnut.fi')).toBe(true);
  });
});
