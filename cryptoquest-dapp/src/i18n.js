// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Welcome": "Welcome to CryptoQuest"
      }
    },
    es: {
      translation: {
        "Welcome": "Bienvenido a CryptoQuest"
      }
    }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
