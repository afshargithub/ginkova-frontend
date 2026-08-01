export const SUPPORTED_LANGUAGES = [
    "en",
    "fa",
    "hy",
    "ru",
] as const;


export type SupportedLanguage =
    (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage =
    "en";

export const LANGUAGE_STORAGE_KEY =
    "ginkova_language";

export function normalizeLanguageCode(
    languageCode: string | null | undefined
): SupportedLanguage {
    if (!languageCode) {
        return DEFAULT_LANGUAGE;
    }

    const normalizedCode = languageCode
        .trim()
        .toLowerCase()
        .split("-")[0];

    if (
        SUPPORTED_LANGUAGES.includes(
            normalizedCode as SupportedLanguage
        )
    ) {
        return normalizedCode as SupportedLanguage;
    }

    return DEFAULT_LANGUAGE;
}

export function getStoredLanguage():
    SupportedLanguage {
    if (typeof window === "undefined") {
        return DEFAULT_LANGUAGE;
    }

    return normalizeLanguageCode(
        window.localStorage.getItem(
            LANGUAGE_STORAGE_KEY
        )
    );
}

export function storeLanguage(
    language: SupportedLanguage
): void {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        language
    );
}

export function getLanguageDirection(
    language: SupportedLanguage
): "rtl" | "ltr" {
    return language === "fa" ? "rtl" : "ltr";
}

export function applyDocumentLanguage(
    language: SupportedLanguage
): void {
    if (typeof document === "undefined") {
        return;
    }

    document.documentElement.lang = language;
    document.documentElement.dir =
        getLanguageDirection(language);
}