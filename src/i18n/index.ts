import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en";
import fa from "./locales/fa";
import hy from "./locales/hy";
import ru from "./locales/ru";

import {
    applyDocumentLanguage,
    getStoredLanguage,
    normalizeLanguageCode,
    storeLanguage,
} from "./language";

const initialLanguage = getStoredLanguage();

void i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en,
            },

            fa: {
                translation: fa,
            },

            hy: {
                translation: hy,
            },

            ru: {
                translation: ru,
            },
        },

        lng: initialLanguage,

        fallbackLng: "en",

        supportedLngs: [
            "en",
            "fa",
            "hy",
            "ru",
        ],

        interpolation: {
            escapeValue: false,
        },

        returnNull: false,
    });

applyDocumentLanguage(initialLanguage);

i18n.on(
    "languageChanged",
    (languageCode: string) => {
        const language =
            normalizeLanguageCode(languageCode);

        storeLanguage(language);
        applyDocumentLanguage(language);
    }
);

export default i18n;