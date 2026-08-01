import mealPlaceholder from "../../assets/images/placeholders/meal-placeholder.svg";
import type { Meal } from "../../types/Meal";
import { resolveMediaUrl } from "../../utils/mediaUrl";
import AppImage from "../common/AppImage";

interface Props {
    meal: Meal;
}

export default function MealCard({ meal }: Props) {
    const imageUrl = resolveMediaUrl(meal.image);

    return (
        <article
            className="
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-md
                transition
                hover:-translate-y-1
                hover:shadow-xl
            "
        >
            <AppImage
                src={imageUrl}
                fallbackSrc={mealPlaceholder}
                alt={meal.name}
                className="
                    aspect-[16/10]
                    w-full
                    object-cover
                "
            />

            <div className="p-5">
                <h2
                    className="
                        text-xl
                        font-bold
                        text-gray-900
                    "
                >
                    {meal.name}
                </h2>

                {meal.description && (
                    <p
                        className="
                            mt-2
                            line-clamp-3
                            text-gray-600
                        "
                    >
                        {meal.description}
                    </p>
                )}

                {meal.nutrition && (
                    <div
                        className="
                            mt-4
                            space-y-1
                            rounded-xl
                            bg-green-50
                            p-4
                            text-sm
                            text-gray-700
                        "
                    >
                        {meal.nutrition.calories !==
                            undefined && (
                            <p>
                                <span className="font-semibold">
                                    Calories:
                                </span>{" "}
                                {
                                    meal.nutrition
                                        .calories
                                }
                            </p>
                        )}

                        {meal.nutrition.protein !==
                            undefined && (
                            <p>
                                <span className="font-semibold">
                                    Protein:
                                </span>{" "}
                                {
                                    meal.nutrition
                                        .protein
                                }
                            </p>
                        )}

                        {meal.nutrition.fat !==
                            undefined && (
                            <p>
                                <span className="font-semibold">
                                    Fat:
                                </span>{" "}
                                {meal.nutrition.fat}
                            </p>
                        )}

                        {meal.nutrition.carbohydrate !== undefined && (
                            <p>
                                <span className="font-semibold">
                                    Carbohydrate:
                                </span>{" "}
                                {meal.nutrition.carbohydrate}
                            </p>
                        )}

                        {meal.nutrition.fiber !== undefined && (
                            <p>
                                <span className="font-semibold">
                                    Fiber:
                                </span>{" "}
                                {meal.nutrition.fiber}
                            </p>
                        )}

                        {meal.nutrition.sugar !== undefined && (
                            <p>
                                <span className="font-semibold">
                                    Sugar:
                                </span>{" "}
                                {meal.nutrition.sugar}
                            </p>
                        )}

                        {meal.nutrition.sodium !== undefined && (
                            <p>
                                <span className="font-semibold">
                                    Sodium:
                                </span>{" "}
                                {meal.nutrition.sodium}
                            </p>
                        )}

                    </div>
                )}

                <div
                    className="
                        mt-5
                        flex
                        flex-wrap
                        gap-3
                    "
                >
                    <button
                        type="button"
                        className="
                            rounded-lg
                            bg-blue-600
                            px-4
                            py-2
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-700
                        "
                    >
                        View Details
                    </button>

                    <button
                        type="button"
                        className="
                            rounded-lg
                            bg-green-600
                            px-4
                            py-2
                            font-semibold
                            text-white
                            transition
                            hover:bg-green-700
                        "
                    >
                        Order
                    </button>
                </div>
            </div>
        </article>
    );
}