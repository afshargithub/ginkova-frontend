import HeroSection from "../components/home/HeroSection";
import MealCategoryList from "../components/home/MealCategoryList";

function Home() {
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
                            Meal categories
                        </p>

                        <h2
                            className="
                                text-3xl
                                font-bold
                                text-gray-900
                                md:text-4xl
                            "
                        >
                            Explore meal categories
                        </h2>

                        <p
                            className="
                                mt-3
                                max-w-2xl
                                text-gray-600
                            "
                        >
                            Select a category to discover
                            meals suitable for your needs.
                        </p>
                    </div>

                    <MealCategoryList />
                </div>
            </section>
        </div>
    );
}

export default Home;