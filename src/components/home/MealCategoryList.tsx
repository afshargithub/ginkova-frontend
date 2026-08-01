import {
    useEffect,
    useState,
} from "react";

import { getMealCategories } from "../../services/mealCategoryService";
import type { MealCategory } from "../../types/MealCategory";
import MealCategoryCard from "./MealCategoryCard";

export default function MealCategoryList() {
    const [categories, setCategories] = useState<
        MealCategory[]
    >([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(
        null
    );

    useEffect(() => {
        let isActive = true;

        setLoading(true);
        setError(null);

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
                    setError(
                        "Unable to load meal categories."
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
    }, []);

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
                Loading meal categories...
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
                No meal categories found.
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
            {categories.map((category) => (
                <MealCategoryCard
                    key={category.id}
                    category={category}
                />
            ))}
        </div>
    );
}