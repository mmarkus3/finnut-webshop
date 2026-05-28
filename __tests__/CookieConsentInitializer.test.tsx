import {
  CookieConsentInitializer,
  createCookieConsentConfig,
  resolveConsentLanguage,
} from '@/components/consent/CookieConsentInitializer';
import React from 'react';
import renderer from 'react-test-renderer';

const mockRun = jest.fn().mockResolvedValue(undefined);
let mockActiveLanguage = 'fi';

jest.mock('vanilla-cookieconsent', () => ({
  run: (...args: unknown[]) => mockRun(...args),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: mockActiveLanguage,
    },
  }),
}));

describe('CookieConsentInitializer', () => {
  const originalDocumentDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'document');

  beforeEach(() => {
    mockActiveLanguage = 'fi';
    mockRun.mockClear();
    Object.defineProperty(globalThis, 'document', {
      configurable: true,
      value: {},
    });
  });

  afterAll(() => {
    if (originalDocumentDescriptor) {
      Object.defineProperty(globalThis, 'document', originalDocumentDescriptor);
    } else {
      delete (globalThis as { document?: unknown }).document;
    }
  });

  it('initializes cookie consent once with the active application language in a browser runtime', () => {
    let tree: renderer.ReactTestRenderer | null = null;

    renderer.act(() => {
      tree = renderer.create(<CookieConsentInitializer />);
    });
    renderer.act(() => {
      tree!.update(<CookieConsentInitializer />);
    });

    expect(mockRun).toHaveBeenCalledTimes(1);
    expect(mockRun).toHaveBeenCalledWith(expect.objectContaining({ language: expect.objectContaining({ default: 'fi' }) }));
  });

  it('configures necessary cookies as mandatory and analytics cookies as optional', () => {
    const config = createCookieConsentConfig('fi');

    expect(config.categories.necessary).toEqual({ enabled: true, readOnly: true });
    expect(config.categories.analytics).toEqual({});
    expect(config.language.translations.fi).toEqual(
      expect.objectContaining({
        preferencesModal: expect.objectContaining({
          sections: expect.arrayContaining([
            expect.objectContaining({ linkedCategory: 'necessary' }),
            expect.objectContaining({ linkedCategory: 'analytics' }),
          ]),
        }),
      })
    );
  });

  it.each([
    ['fi-FI', 'fi', 'Käytämme evästeitä'],
    ['en-US', 'en', 'We use cookies'],
    ['sv-SE', 'sv', 'Vi använder cookies'],
  ])('selects %s consent content as %s', (language, expectedLanguage, expectedTitle) => {
    const config = createCookieConsentConfig(language);
    const selectedTranslation = config.language.translations[expectedLanguage] as CookieConsent.Translation;

    expect(resolveConsentLanguage(language)).toBe(expectedLanguage);
    expect(config.language.default).toBe(expectedLanguage);
    expect(selectedTranslation.consentModal.title).toBe(expectedTitle);
  });
});
