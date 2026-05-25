import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as CookieConsent from 'vanilla-cookieconsent';

type ConsentLanguage = 'fi' | 'en' | 'sv';

const translations: Record<ConsentLanguage, CookieConsent.Translation> = {
  fi: {
    consentModal: {
      title: 'Käytämme evästeitä',
      description:
        'Käytämme välttämättömiä evästeitä verkkokaupan toimintaan ja valinnaisia analytiikkaevästeitä palvelun kehittämiseen.',
      acceptAllBtn: 'Hyväksy kaikki',
      acceptNecessaryBtn: 'Hyväksy vain välttämättömät',
      showPreferencesBtn: 'Hallitse asetuksia',
    },
    preferencesModal: {
      title: 'Evästeasetukset',
      acceptAllBtn: 'Hyväksy kaikki',
      acceptNecessaryBtn: 'Hyväksy vain välttämättömät',
      savePreferencesBtn: 'Tallenna valinnat',
      closeIconLabel: 'Sulje',
      sections: [
        {
          title: 'Evästeiden käyttö',
          description:
            'Valitse, mitä evästeitä saamme käyttää. Välttämättömiä evästeitä tarvitaan verkkokaupan toimintaan.',
        },
        {
          title: 'Välttämättömät evästeet',
          description: 'Näitä evästeitä tarvitaan verkkokaupan perustoimintoihin, eikä niitä voi poistaa käytöstä.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analytiikkaevästeet',
          description: 'Nämä evästeet auttavat meitä ymmärtämään, miten verkkokauppaa käytetään ja kehittämään palvelua.',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
  en: {
    consentModal: {
      title: 'We use cookies',
      description:
        'We use necessary cookies to operate the webshop and optional analytics cookies to improve the service.',
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Accept necessary only',
      showPreferencesBtn: 'Manage preferences',
    },
    preferencesModal: {
      title: 'Cookie preferences',
      acceptAllBtn: 'Accept all',
      acceptNecessaryBtn: 'Accept necessary only',
      savePreferencesBtn: 'Save preferences',
      closeIconLabel: 'Close',
      sections: [
        {
          title: 'Cookie use',
          description:
            'Choose which cookies we may use. Necessary cookies are required for the webshop to function.',
        },
        {
          title: 'Necessary cookies',
          description: 'These cookies are essential for core webshop functions and cannot be disabled.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analytics cookies',
          description: 'These cookies help us understand how the webshop is used and improve the service.',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
  sv: {
    consentModal: {
      title: 'Vi använder kakor',
      description:
        'Vi använder nödvändiga kakor för webbshopens funktion och valfria analyskakor för att utveckla tjänsten.',
      acceptAllBtn: 'Godkänn alla',
      acceptNecessaryBtn: 'Godkänn endast nödvändiga',
      showPreferencesBtn: 'Hantera inställningar',
    },
    preferencesModal: {
      title: 'Inställningar för kakor',
      acceptAllBtn: 'Godkänn alla',
      acceptNecessaryBtn: 'Godkänn endast nödvändiga',
      savePreferencesBtn: 'Spara val',
      closeIconLabel: 'Stäng',
      sections: [
        {
          title: 'Användning av kakor',
          description: 'Välj vilka kakor vi får använda. Nödvändiga kakor krävs för att webbshoppen ska fungera.',
        },
        {
          title: 'Nödvändiga kakor',
          description: 'Dessa kakor krävs för webbshopens grundläggande funktioner och kan inte inaktiveras.',
          linkedCategory: 'necessary',
        },
        {
          title: 'Analyskakor',
          description: 'Dessa kakor hjälper oss att förstå hur webbshoppen används och att utveckla tjänsten.',
          linkedCategory: 'analytics',
        },
      ],
    },
  },
};

export function resolveConsentLanguage(language: string): ConsentLanguage {
  if (language.toLowerCase().startsWith('en')) return 'en';
  if (language.toLowerCase().startsWith('sv')) return 'sv';
  return 'fi';
}

export function createCookieConsentConfig(language: string): CookieConsent.CookieConsentConfig {
  return {
    categories: {
      necessary: {
        enabled: true,
        readOnly: true,
      },
      analytics: {},
    },
    language: {
      default: resolveConsentLanguage(language),
      translations,
    },
  };
}

export function CookieConsentInitializer() {
  const { i18n } = useTranslation();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current || typeof document === 'undefined') return;

    hasInitialized.current = true;
    void CookieConsent.run(createCookieConsentConfig(i18n.language));
  }, [i18n.language]);

  return null;
}
