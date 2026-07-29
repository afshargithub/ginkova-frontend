// import HealthGoalList from "../components/health/HealthGoalList";
import HeroSection from "../components/home/HeroSection";
import MealCategoryList from "../components/home/MealCategoryList";


function Home() {

    return (

        <div>

            <HeroSection />
            <h1 className="text-3xl font-bold mb-8">
                Choose your nutrition goal
            </h1>

            
            <MealCategoryList />

        </div>

    );

}

export default Home;