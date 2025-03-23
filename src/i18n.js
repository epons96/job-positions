import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";

const resources = {
  en: {
    translation: en,
  },
};

// i18next configuration
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.split("-")[0] || "es",
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
