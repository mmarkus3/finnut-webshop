import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './en/translation.json';
import translationFi from './fi/translation.json';
import translationSv from './sv/translation.json';

// eslint-disable-next-line import/no-named-as-default-member
i18next.use(initReactI18next).init({
  lng: 'fi',
  resources: {
    fi: {
      translation: translationFi,
    },
    en: {
      translation: translationEn,
    },
    sv: {
      translation: translationSv,
    },
  },
});
