import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import jaTranslations from './locales/ja.json';
import frTranslations from './locales/fr.json';
import esTranslations from './locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ja: { translation: jaTranslations },
      fr: { translation: frTranslations },
      es: { translation: esTranslations },
    },
    lng: 'en', // デフォルト言語
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;