import {
    useEffect,
    useState,
} from "react";

import { useTranslation } from "react-i18next";

import {
    normalizeLanguageCode,
} from "../../i18n/language";
import { getMealCategories } from "../../services/mealCategoryService";
import type { MealCategory } from "../../types/MealCategory";
import MealCategoryCard from "./MealCategoryCard";

export default function MealCategoryList() {
    const { t, i18n } = useTranslation();

    const activeLanguage =
        normalizeLanguageCode(
            i18n.resolvedLanguage ??
                i18n.language
        );

    const [
        categories,
        setCategories,
    ] = useState<MealCategory[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        hasError,
        setHasError,
    ] = useState(false);

    useEffect(() => {
        let isActive = true;

        setLoading(true);
        setHasError(false);
        setCategories([]);

        getMealCategories()
            .then((data) => {
                if (isActive) {
                    setCategories(data);
                }
            })
            .catch((requestError) => {
                console.error(
                    "Meal categories error:",
                    requestError
                );

                if (isActive) {
                    setHasError(true);
                }
            })
            .finally(() => {
                if (isActive) {
                    setLoading(false);
                }
            });

        return () => {
            isActive = false;
        };
    }, [activeLanguage]);

    if (loading) {
        return (
            <div
                className="
                    rounded-2xl
                    bg-green-50
                    p-8
                    text-center
                    text-green-800
                "
            >
                {t("categories.loading")}
            </div>
        );
    }

    if (hasError) {
        return (
            <div
                role="alert"
                className="
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    p-8
                    text-center
                    text-red-700
                "
            >
                {t("categories.error")}
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div
                className="
                    rounded-2xl
                    bg-gray-100
                    p-8
                    text-center
                    text-gray-600
                "
            >
                {t("categories.empty")}
            </div>
        );
    }

    return (
        <div
            className="
                grid
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
            "
        >
            {categories.map(
                (category) => (
                    <MealCategoryCard
                        key={category.id}
                        category={category}
                    />
                )
            )}
        </div>
    );
}