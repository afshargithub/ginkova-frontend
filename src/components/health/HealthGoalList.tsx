import {
    useEffect,
    useState,
} from "react";

import { useTranslation } from "react-i18next";

import {
    normalizeLanguageCode,
} from "../../i18n/language";
import { getHealthGoals } from "../../services/healthGoalService";
import type { HealthGoal } from "../../types/HealthGoal";
import HealthGoalCard from "./HealthGoalCard";

export default function HealthGoalList() {
    const { t, i18n } = useTranslation();

    const activeLanguage =
        normalizeLanguageCode(
            i18n.resolvedLanguage ??
                i18n.language
        );

    const [
        goals,
        setGoals,
    ] = useState<HealthGoal[]>([]);

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
        setGoals([]);

        getHealthGoals()
            .then((data) => {
                if (isActive) {
                    setGoals(data);
                }
            })
            .catch((requestError) => {
                console.error(
                    "Health goals error:",
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
                {t("healthGoals.loading")}
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
                {t("healthGoals.error")}
            </div>
        );
    }

    if (goals.length === 0) {
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
                {t("healthGoals.empty")}
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
            {goals.map((goal) => (
                <HealthGoalCard
                    key={goal.id}
                    goal={goal}
                />
            ))}
        </div>
    );
}