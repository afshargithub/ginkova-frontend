import { useParams } from "react-router-dom";

import MealList from "../components/meals/MealList";

export default function Meals() {
    const { categoryId } = useParams<{
        categoryId: string;
    }>();

    if (!categoryId) {
        return (
            <div
                className="
                    mx-auto
                    max-w-7xl
                    px-4
                    py-16
                "
            >
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
                    Category not found.
                </div>
            </div>
        );
    }

    return (
        <section className="px-4 py-12 md:py-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10">
                    <p
                        className="
                            mb-2
                            text-sm
                            font-semibold
                            uppercase
                            tracking-wider
                            text-green-600
                        "
                    >
                        GINKOVA meals
                    </p>

                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-gray-900
                            md:text-4xl
                        "
                    >
                        Meals
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Discover meals available in this
                        category.
                    </p>
                </div>

                <MealList categoryId={categoryId} />
            </div>
        </section>
    );
}