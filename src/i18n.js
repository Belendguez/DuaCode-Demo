import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./locales/es.json"; 
import gl from "./locales/gl.json";
import en from "./locales/en.json";

const resources = {
  es: { translation: es },
  gl: { translation: gl },
  en: { translation: en }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  fallbackLng: "es",
  interpolation: { escapeValue: false }
});

export default i18n;