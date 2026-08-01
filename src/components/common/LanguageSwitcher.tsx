import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import {
    normalizeLanguageCode,
    type SupportedLanguage,
} from "../../i18n/language";

export default function LanguageSwitcher() {
    const { t, i18n } = useTranslation();

    const currentLanguage =
        normalizeLanguageCode(
            i18n.resolvedLanguage ??
                i18n.language
        );

    function handleLanguageChange(
        event: ChangeEvent<HTMLSelectElement>
    ): void {
        const language =
            event.target
                .value as SupportedLanguage;

        void i18n.changeLanguage(language);
    }

    return (
        <div className="flex items-center gap-2">
            <label
                htmlFor="language-switcher"
                className="sr-only"
            >
                {t("language.label")}
            </label>

            <select
                id="language-switcher"
                value={currentLanguage}
                onChange={handleLanguageChange}
                aria-label={t("language.label")}
                className="
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-3
                    py-2
                    text-sm
                    text-gray-800
                    outline-none
                    transition
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-200
                "
            >
                <option value="en">
                    {t("language.english")}
                </option>

                <option value="fa">
                    {t("language.persian")}
                </option>

                <option value="hy">
                    {t("language.armenian")}
                </option>

                <option value="ru">
                    {t("language.russian")}
                </option>
            </select>
        </div>
    );
}