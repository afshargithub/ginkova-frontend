import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import categoryPlaceholder from "../../assets/images/placeholders/category-placeholder.svg";
import type { MealCategory } from "../../types/MealCategory";
import { resolveMediaUrl } from "../../utils/mediaUrl";
import AppImage from "../common/AppImage";

interface Props {
    category: MealCategory;
}

export default function MealCategoryCard({
    category,
}: Props) {
    const { t } = useTranslation();

    const imageUrl =
        resolveMediaUrl(category.image);

    return (
        <Link
            to={`/meals/category/${category.id}`}
            className="
                group
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-md
                transition
                hover:-translate-y-1
                hover:shadow-xl
                focus:outline-none
                focus:ring-4
                focus:ring-green-200
            "
        >
            <AppImage
                src={imageUrl}
                fallbackSrc={categoryPlaceholder}
                alt={t("categoryCard.imageAlt", {
                    name: category.name,
                })}
                loading="lazy"
                className="
                    aspect-[16/9]
                    w-full
                    object-cover
                    transition
                    duration-300
                    group-hover:scale-105
                "
            />

            <div className="p-6">
                <h3
                    className="
                        text-2xl
                        font-bold
                        text-green-700
                    "
                >
                    {category.name}
                </h3>

                {category.description && (
                    <p
                        className="
                            mt-3
                            line-clamp-3
                            text-gray-600
                        "
                    >
                        {category.description}
                    </p>
                )}

                <span
                    className="
                        mt-6
                        inline-flex
                        rounded-xl
                        bg-green-600
                        px-6
                        py-2
                        font-semibold
                        text-white
                        transition
                        group-hover:bg-green-700
                    "
                >
                    {t("categoryCard.action")}
                </span>
            </div>
        </Link>
    );
}