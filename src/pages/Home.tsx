import { useTranslation } from "react-i18next";

import HeroSection from "../components/home/HeroSection";
import MealCategoryList from "../components/home/MealCategoryList";

function Home() {
    const { t } = useTranslation();

    return (
        <div>
            <HeroSection />

            <section
                id="meal-categories"
                className="
                    scroll-mt-24
                    px-4
                    py-12
                    md:py-16
                "
            >
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
                            {t("homeSection.badge")}
                        </p>

                        <h2
                            className="
                                text-3xl
                                font-bold
                                text-gray-900
                                md:text-4xl
                            "
                        >
                            {t("homeSection.title")}
                        </h2>

                        <p
                            className="
                                mt-3
                                max-w-2xl
                                text-gray-600
                            "
                        >
                            {t(
                                "homeSection.description"
                            )}
                        </p>
                    </div>

                    <MealCategoryList />
                </div>
            </section>
        </div>
    );
}

export default Home;