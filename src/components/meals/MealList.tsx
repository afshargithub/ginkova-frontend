import {
    useEffect,
    useState,
} from "react";

import { useTranslation } from "react-i18next";

import {
    normalizeLanguageCode,
} from "../../i18n/language";
import { getMealsByCategory } from "../../services/mealService";
import type { Meal } from "../../types/Meal";
import MealCard from "./MealCard";

interface Props {
    categoryId: string;
}

export default function MealList({
    categoryId,
}: Props) {
    const { t, i18n } = useTranslation();

    const activeLanguage =
        normalizeLanguageCode(
            i18n.resolvedLanguage ??
                i18n.language
        );

    const [
        meals,
        setMeals,
    ] = useState<Meal[]>([]);

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
        setMeals([]);

        getMealsByCategory(categoryId)
            .then((data) => {
                if (isActive) {
                    setMeals(data);
                }
            })
            .catch((requestError) => {
                console.error(
                    "Meals error:",
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
    }, [
        categoryId,
        activeLanguage,
    ]);

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
                {t("meals.loading")}
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
                {t("meals.error")}
            </div>
        );
    }

    if (meals.length === 0) {
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
                {t("meals.empty")}
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
            {meals.map(
                (meal) => (
                    <MealCard
                        key={meal.id}
                        meal={meal}
                    />
                )
            )}
        </div>
    );
}