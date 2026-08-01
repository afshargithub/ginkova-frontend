import {
    useEffect,
    useState,
} from "react";

import { getMealsByCategory } from "../../services/mealService";
import type { Meal } from "../../types/Meal";
import MealCard from "./MealCard";

interface Props {
    categoryId: string;
}

export default function MealList({
    categoryId,
}: Props) {
    const [meals, setMeals] = useState<Meal[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(
        null
    );

    useEffect(() => {
        let isActive = true;

        setLoading(true);
        setError(null);
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
                    setError(
                        "Unable to load meals."
                    );
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
    }, [categoryId]);

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
                Loading meals...
            </div>
        );
    }

    if (error) {
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
                {error}
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
                No meals found in this category.
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
            {meals.map((meal) => (
                <MealCard
                    key={meal.id}
                    meal={meal}
                />
            ))}
        </div>
    );
}