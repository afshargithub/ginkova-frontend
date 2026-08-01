import { useTranslation } from "react-i18next";

import heroImage from "../../assets/hero.png";
import mealPlaceholder from "../../assets/images/placeholders/meal-placeholder.svg";
import AppImage from "../common/AppImage";

function HeroSection() {
    const { t } = useTranslation();

    return (
        <section className="px-4 py-12 md:py-20">
            <div
                className="
                    mx-auto
                    grid
                    max-w-7xl
                    items-center
                    gap-10
                    md:grid-cols-2
                "
            >
                <div>
                    <p
                        className="
                            mb-4
                            text-sm
                            font-semibold
                            uppercase
                            tracking-wider
                            text-green-600
                        "
                    >
                        {t("hero.badge")}
                    </p>

                    <h1
                        className="
                            text-4xl
                            font-bold
                            leading-tight
                            text-green-800
                            md:text-5xl
                            lg:text-6xl
                        "
                    >
                        {t("hero.titleFirstLine")}

                        <br />

                        {t("hero.titleSecondLine")}
                    </h1>

                    <p
                        className="
                            mt-6
                            max-w-xl
                            text-lg
                            leading-8
                            text-gray-600
                        "
                    >
                        {t("hero.description")}
                    </p>

                    <a
                        href="#meal-categories"
                        className="
                            mt-8
                            inline-flex
                            items-center
                            justify-center
                            rounded-xl
                            bg-green-600
                            px-8
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-green-700
                            focus:outline-none
                            focus:ring-4
                            focus:ring-green-200
                        "
                    >
                        {t("hero.action")}
                    </a>
                </div>

                <div className="flex justify-center">
                    <div
                        className="
                            w-full
                            max-w-xl
                            overflow-hidden
                            rounded-3xl
                            bg-green-100
                            shadow-lg
                        "
                    >
                        <AppImage
                            src={heroImage}
                            fallbackSrc={
                                mealPlaceholder
                            }
                            alt={t("hero.imageAlt")}
                            loading="eager"
                            className="
                                aspect-[4/3]
                                h-full
                                w-full
                                object-cover
                            "
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;